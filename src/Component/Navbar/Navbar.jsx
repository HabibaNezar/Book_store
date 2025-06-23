import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import wave from '../../assets/wave-haikei.svg'
import { userContext } from '../../../Context/UserContext'

export default function Navbar() {

  let { userLogin, setUserLogin } = useContext(userContext)
  let navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false) // ⬅️ حالة القائمة

  function logOut() {
    localStorage.removeItem('userToken')
    setUserLogin(null)
    navigate('/login')
  }

  return (
    <>
      <nav className="bg-[--background-color] relative">
        <div className="max-w-screen-xl flex flex-wrap justify-between items-center mx-auto p-8 ">
          {userLogin !== null?
            <NavLink to={`/home`} className={``}>
              <div className="flex flex-row items-baseline text-[--accent-color] gap-1 pointer-cursor">
                <i className="fa-solid fa-book-open-reader text-3xl"></i>
                <p className='text-2xl font-bold'>Booksy</p>
              </div>
            </NavLink> 
          :
            <NavLink className={``}>
              <div className="flex flex-row items-baseline text-[--accent-color] gap-1 pointer-cursor">
                <i className="fa-solid fa-book-open-reader text-3xl"></i>
                <p className='text-2xl font-bold'>Booksy</p>
              </div>
            </NavLink> 
          }

          {/* search and icons */}
          <div className="flex md:order-2 w-full md:w-2/3 justify-end">
            <div className='hidden md:flex'>
              {userLogin !== null ?
                <p onClick={logOut} className="relative text-[--accent-color] text-xl font-semibold cursor-pointer group hover:text-[--second-color]">
                  Logout
                  <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-[--second-color] transition-all duration-300 group-hover:w-full origin-right"></span>
                </p> : null
              }
            </div>

            {userLogin !== null ?
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)} // ⬅️ تبديل الحالة
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button> : null}
          </div>

          {/* Small screen search and menu */}
          {userLogin !== null ?
            <div className={`items-center justify-center self-baseline ${isMenuOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-search">
              <ul className="border-t-2 border-[--accent-color-light] text-xl bg-[--background-color] pt-4 md:h-10  md:absolute right-0 left-0 -bottom-10 z-50 justify-center items-center flex flex-col p-4  mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 text-[--text-color]">
                <NavLink
                  to="/category"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-[--accent-color] pb-1 text-[--accent-color]"
                      : "hover:text-[--accent-color]"
                  }
                >
                  Category
                </NavLink>
                <NavLink
                  to="/languages"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-[--accent-color] pb-1 text-[--accent-color]"
                      : "hover:text-[--accent-color]"
                  }
                >
                  Languages
                </NavLink>
                <NavLink
                  to="/newest"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-[--accent-color] pb-1 text-[--accent-color]"
                      : "hover:text-[--accent-color]"
                  }
                >
                  Newest
                </NavLink>
              </ul>
            </div> : null}

        </div>
      </nav>

      {/* 👇 الويف هنا */}
      {userLogin !== null?
        <div className="relative w-full -mt-1 md:-bottom-8">
        <img src={wave} alt="wave" className="w-full h-auto" />
      </div> : null}
    </>
  )
}
