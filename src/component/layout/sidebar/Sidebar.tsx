'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import {
  MasterIconUpArrow,
  SearchIcon,
} from '@/utils/icons/icons'
import { useDispatch } from 'react-redux'
import { closeModal } from '@/utils/redux/features/reduxData'
import SidebarArray from '@/utils/sidebarArray'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
}

interface Menu {
  name: string
  link: any
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname()
  const [sidebarClose, setSidebarClose] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMenu, setFilteredMenu] = useState(SidebarArray);


  const trigger = useRef<any>(null)
  const sidebar = useRef<any>(null)

  let storedSidebarExpanded = 'true'

  const [open, setOpen] = useState('1')

  // Toggle menu open/close state

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  )
  const dispatch = useDispatch()

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])

  const handleClick = (id: any) => {
    setOpen(open === id ? null : id);
  };


  const handleSearch = useCallback(
    debounce((term:any) => {
      if (term) {
        const filtered = SidebarArray.map((menuItem:any) => {
          const titleMatch = menuItem.title.toLowerCase().includes(term.toLowerCase());
          const subMenuMatch = menuItem.subMenu?.filter((subItem:any) => 
            subItem.name.toLowerCase().includes(term.toLowerCase())
          );
          if (titleMatch || (subMenuMatch && subMenuMatch.length > 0)) {
            return {
              ...menuItem,
              subMenu: subMenuMatch?.length > 0 ? subMenuMatch : menuItem.subMenu,
            };
          }
          return null;
        }).filter(Boolean); // Filter out null values
        setFilteredMenu(filtered);
      } else {
        setFilteredMenu(SidebarArray);
      }
    }, 300), // Adjust the debounce delay as needed
    []
  );

  useEffect(() => {
    handleSearch(searchTerm);
    return () => {
      handleSearch.cancel();
    };
  }, [searchTerm, handleSearch]);

  const handleChange = (e:any) => {
    setSearchTerm(e.target.value);
  };

  // console.log("sfddfdf",filteredMenu)

  return (
    // <aside
    //   ref={sidebar}
    //   className={`absolute left-0 top-0 z-9999 flex h-screen w-64 flex-col overflow-y-hidden bg-black duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
    //     }`}
    // >
    <>
      <div
        className={`absolute top-1/2  ${sidebarClose == true ? 'left-0' : 'left-72'
          }  z-50 transform -translate-y-1/2`}
      >
        {sidebarClose == true ? (
          <button onClick={() => setSidebarClose(!sidebarClose)}>
            <svg
              width="16"
              height="80"
              viewBox="0 0 16 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_14800_603)">
                <path
                  d="M0 0L8.41458 7.88867C13.2542 12.4258 16 18.7638 16 25.3976V54.6024C16 61.2362 13.2542 67.5742 8.41459 72.1113L0 80V0Z"
                  fill="black"
                />
                <path
                  d="M5 34.75L10.25 40L5 45.25"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_14800_603">
                  <rect width="16" height="80" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        ) : (
          <button onClick={() => setSidebarClose(!sidebarClose)}>
            <svg
              width="16"
              height="80"
              viewBox="0 0 16 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_14800_604)">
                <path
                  d="M0 0L8.41458 7.88867C13.2542 12.4258 16 18.7638 16 25.3976V54.6024C16 61.2362 13.2542 67.5742 8.41459 72.1113L0 80V0Z"
                  fill="black"
                />
                <path
                  d="M10.25 34.75L5 40L10.25 45.25"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_14800_604">
                  <rect width="16" height="80" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        )}
      </div>
      <aside
        className={`${sidebarClose ? 'closer-item' : ''
          } overflow-hidden absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark  ${sidebarClose ? '' : 'lg:static'
          }  lg:translate-x-0 ${sidebarClose ? 'w-0' : 'w-72'} ${!sidebarOpen ? 'translate-x-0' : 'lg:w-20'
          }`}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5 bg-black ml-20">
          <svg height="30" width="250" xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="30" fill="white" stroke="white" fontSize="35">
              SmartPPC
            </text>
          </svg>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-0 px-4 py-0">
          <div className="relative">
              {SearchIcon}
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Search..."
                  className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none focus:ring-0 focus:border-transparent xl:w-125 no-blue-placeholder"
                />
            </div>

          {/* <input id="breakName" type="text" className="w-full px-2 py-2 border rounded p-5"/> */}
            <div className='mt-3'>
              <ul className="mb-6 flex flex-col gap-1.5 ">
                {/* <!-- Menu Item Dashboard --> */}

                {filteredMenu?.map((menuItem: any) => (
                  <>
                    <Link
                      href=""
                      onClick={() => handleClick(menuItem?.id)}
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:text-white bg-graydark dark:bg-meta-4 ${(pathname === '/' || pathname.includes('dashboard')) &&
                        'bg-graydark dark:bg-meta-4'
                        }`}
                    >
                      {menuItem?.icon}
                      {menuItem?.title}
                      <MasterIconUpArrow open={menuItem.id == open ? true : false} />
                    </Link>
                    <div
                      className={`translate transform overflow-hidden ${menuItem.id == open ? '' : 'hidden'}`}
                    >
                      <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-4 list-disc text-white ml-6">
                        {menuItem?.subMenu?.map((item:any,index:any) => (<li key={index} className="">
                            <div className="flex">
                              {menuItem.id === item.id && item.link && (
                                <Link
                                  key={item.id}
                                  href={item.link}
                                  onClick={() => dispatch(closeModal())}
                                  className={`group relative flex items-center rounded-md font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === item.active && 'text-white'
                                    }`}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </div>
                          </li>
                          ))}
                      </ul>
                    </div>
                  </>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default React.memo(Sidebar)
