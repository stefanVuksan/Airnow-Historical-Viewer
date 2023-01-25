import { Disclosure} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MainTabView(props) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <h1 className="text-xl font-semibold text-gray-900">Historical View</h1>
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {props.navigation.map((item, idx) => (
                        <a
                          key={idx}
                          className={classNames(
                            idx == currentTabIndex
                              ? 'border-indigo-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer'
                          )}
                          aria-current={idx == currentTabIndex ? 'page' : undefined}
                          onClick={()=>setCurrentTabIndex(idx)}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pt-2 pb-3">
                  {props.navigation.map((item, idx) => (
                    <Disclosure.Button
                      key={idx}
                      as="a"
                      className={classNames(
                        idx == currentTabIndex
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer'
                      )}
                      aria-current={idx == currentTabIndex ? 'page' : undefined}
                      onClick={()=>setCurrentTabIndex(idx)}
                    >
                      {item}
                    </Disclosure.Button>
                  ))}
                </div>

              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
          {props.panels?.map((panel, idx) => (
            <div key={idx} className={`${idx != currentTabIndex ? 'hidden' : ''} p-4 sm:p-6 lg:p-8`}>
              {panel}            
            </div>
          ))}
      </div>
    </>
  )
}
