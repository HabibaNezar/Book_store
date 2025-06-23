import React from 'react'
import img1 from '../../assets/i1.jpg'
import img2 from '../../assets/i2.jpg'
import img3 from '../../assets/i3.jpg'
import img4 from '../../assets/i4.jpg'
import img5 from '../../assets/i5.jpg'
import { NavLink } from 'react-router-dom'

export default function Languages() {

  const languages = [
    {
      language: "Arabic",
      image: img1,
      id: 'ar'
    },
    {
      language: "English",
      image: img2,
      id: 'en'
    },
    {
      language: "France",
      image: img3,
      id: 'fr'
    },
    {
      language: "German",
      image: img4,
      id: 'de'
    },
    {
      language: "Spanish",
      image: img5,
      id: 'es'
    },
  ];
    

  return (
      <>
          <div>
            <div className="header flex-col md:flex-row justify-between items-center md:px-28 px-8 bg-[--background-color]">
              <p className='text-[--text-color] text-3xl py-2 md:pb-10 font-medium'>Find Books By <span className='text-[--accent-color]'>Languages</span></p>
            </div>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:mx-28 mx-8'>
              {languages.map((cat,index) => (
                <NavLink to={`/languageDetails/${cat.id}`}>
                  <div className="category-card relative w-full h-64 overflow-hidden rounded" key={index}>
                    <img src={cat.image} alt={cat.category} className="w-full h-full object-cover absolute top-0 left-0 z-0" />
                    <div className="pt-16 absolute top-0 left-0 w-full h-full bg-[--accent-color-light] z-10 clip-triangle flex flex-col justify-center items-end pr-6">
                      <p className="text-xl font-bold text-black pt-20">{cat.language}</p>
                      <span className=" text-sm text-black mt-8">View All →</span>
                    </div>
                  </div>
                </NavLink>
              
              ))}
            </div>
          </div>
      </>
  )
}
