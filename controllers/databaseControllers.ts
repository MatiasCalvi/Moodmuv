//BASICS 
import {Request, Response} from 'express'
import { Activity } from '../models/activity';
import mongoose from 'mongoose';

//GRIDFS & MULTER UTILITIES
import storageVideos from '../config/storageVideos'
import storageFiles from '../config/storageFiles';
const Grid = require('gridfs-stream')

//INIT GRIDFS-STREAM
let gfs:any
let gfsb:any
let gfsf:any
let gfsfb:any

mongoose.connection.once('open', () => {

	//videos
	gfsb = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName:'videos'})
	gfs = Grid(mongoose.connection.db, mongoose.mongo)
	gfs.collection('videos')

	//files
	gfsfb = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName:'files'})
	gfsf = Grid(mongoose.connection.db, mongoose.mongo)
	gfsf.collection('files')
})

let databaseControllers = {

	//SET METADATA FILES & VIDEOS
	set_metadata_videos: async (req:Request, res:Response) => {
		storageVideos.updateMetadata(req.body.id)
	},

	set_metadata_files: async (req:Request, res:Response) => {
		storageFiles.updateMetadata(req.body.metadata)
	},

	//GET IMAGES & VIDEOS

	get_bkgImage_activity: async (req:Request, res:Response) => {
		try {
			gfsf.files.findOne({metadata:{id:req.params.id, type:'Background image activity'}}, (err:any, file:any) => {
					console.log(file)
				const readstream = gfsfb.openDownloadStream(file._id)

				let data = ''

				readstream.on('data', (chunk:any) => {
					data += chunk.toString('base64')
				})

				readstream.on('end', () => {
					res.send(data)
				})
			})
		} catch(err) {
			res.json({error:'File not found'})
		}

	},

	get_avatarImage_profile: async (req:Request, res:Response) => {
		try{
			gfsf.files.find({metadata:{id:req.params.id, type:'Avatar profile'}}).toArray((err:any, file:any) => {
				if (file.length === 1) {
					const readstream = gfsfb.openDownloadStream(file[0]._id)

					let data = ''

					readstream.on('data', (chunk:any) => {
						data += chunk.toString('base64')
					})

					readstream.on('end', () => {
						res.send(data)
					})

				} else if (file.length > 1){
					let newAvatar = file.pop()

					let oldAvatarArray:Array <string> = file.map((avatar:any) => {return avatar._id})

					gfsfb.delete(...oldAvatarArray)

					const readstream = gfsfb.openDownloadStream(newAvatar._id)

					let data = ''

					readstream.on('data', (chunk:any) => {
						data += chunk.toString('base64')
					})

					readstream.on('end', () => {
						res.send(data)
					})
				} 

			})

		} catch (error) {
			res.json({error:'File not found'})
		}
	}
}

export default databaseControllers