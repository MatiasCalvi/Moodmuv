/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '../../assets/logoDegrade.png'

//UTILITIES
import {Link} from 'react-router-dom'

const navigation = [
  { name: 'Explorar', href: '#', current: false },
  { name: 'Planes', href: '#', current: false },
  { name: 'Como funciona la plataforma', href: '#', current: false },
  { name: 'Iniciar sesión', href: '#', current: false },
  { name: 'Activa tu prueba', href: '#', current: true }
]

const link = ['/explore', '/payments', '/howTo', '/signIn', '/activateAccount']

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto h-24 max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-24 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-between rounded-md p-2 text-[#563D81]  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center sm:justify-between justify-end h-full">
{/* logos */}
                <div className="flex flex-shrink-0 items-center h-full">
			<Link to={'/home'}>
				  <img
				    className="hidden sm:block h-full p-2 w-20 object-contain"
				    src={Logo}
				    alt="Your Company"
				  />
				  <img
				    className="self-end block sm:hidden h-full p-2 w-20 object-contain"
				    src={Logo}
				    alt="Your Company"
				  />

			</Link>
                </div>
                <div className="hidden sm:block sm:ml-6 ">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
			    <Link to={link[navigation.indexOf(item)]}>
			      <a
				key={item.name}
				href={item.href}
				className={classNames(
				  item.current ? 'hover:bg-gradient-to-r hover:from-[#443166] hover:to-[#59457B] bg-gradient-to-r from-[#563D81] to-[#6E5E8B] text-white' : 'text-[#2C2C2C]',
				  'px-3 py-2 rounded-md text-sm font-medium'
				)}
				aria-current={item.current ? 'page' : undefined}
			      >
				{item.name}
			      </a>
			    </Link>
                    ))}
                  </div>
                </div>
              </div>
           
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gradient-to-r from-[#563D81] to-[#563D81] text-white' : 'text-[#2C2C2C] hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
