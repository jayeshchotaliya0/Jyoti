import Link from 'next/link'

import DropdownUser from './DropdownUser'
import Image from 'next/image'
import DropdownNotification from './DropdownNotification'
import { SearchIcon } from '@/utils/icons/icons'

const Header = (props: {
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg0: boolean) => void
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full h-12 bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-6">
        <div className="flex items-center">
          <div className="sm:block">
            <div className="relative">
              {SearchIcon}
              <input
                type="text"
                placeholder="Type to access..."
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none focus:ring-0 focus:border-transparent xl:w-125 no-blue-placeholder"
              />
            </div>
          </div>
          {/* <!-- Hamburger Toggle BTN --> */}
          {/* <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1 shadow-sm dark:border-strokedark dark:bg-boxdark"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
             
            </span>
          </button> */}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <DropdownNotification /> */}
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  )
}

export default Header
