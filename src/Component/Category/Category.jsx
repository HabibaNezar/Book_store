import React from 'react'
import { NavLink } from 'react-router-dom'
import img1 from '../../assets/1.jpg'
import img2 from '../../assets/2.jpg'
import img3 from '../../assets/3.jpg'
import img4 from '../../assets/4.jpg'
import img5 from '../../assets/5.jpg'
import img6 from '../../assets/6.jpg'
import img7 from '../../assets/7.jpg'
import img8 from '../../assets/8.jpg'
import img9 from '../../assets/9.jpg'
import img10 from '../../assets/10.jpg'
import img11 from '../../assets/11.jpg'
import img12 from '../../assets/12.jpg'
import img13 from '../../assets/13.jpg'
import img14 from '../../assets/14.jpg'
import img15 from '../../assets/15.jpg'
import CategoryDetails from './CategoryDetails'

export default function Category() {

  
const categories = [
  {
    category: "Science",
    image: img1
  },
  {
    category: "Literature",
    image: img2
  },
  {
    category: "History",
    image: img3
  },
  {
    category: "Technology",
    image: img4
  },
  {
    category: "Art",
    image: img5
  },
  {
    category: "Self-Help",
    image: img6
  },
  {
    category: "Business",
    image: img7
  },
  {
    category: "Education",
    image: img8
  },
  {
    category: "Medicine",
    image: img9
  },
  {
    category: "Travel",
    image: img10
  },
  {
    category: "Cooking",
    image: img11
  },
  {
    category: "Religion",
    image: img12
  },
  {
    category: "Young Adult",
    image: img13
  },
  {
    category: "Fantasy",
    image: img14
  },
  {
    category: "Sports",
    image: img15
  }
];
  

  return (
    <>
      <div>
        <div className="header flex-col md:flex-row justify-between items-center md:px-28 px-8 bg-[--background-color]">
          <p className='text-[--text-color] text-3xl py-2 md:pb-10 font-medium'>Find Books By <span className='text-[--accent-color]'>Category</span></p>
        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:mx-28 mx-8'>
          {categories.map((cat,index) => (
            <NavLink to={`/categoryDetails/${cat.category}`}>
              <div className="category-card relative w-full h-64 overflow-hidden rounded" key={index}>
                <img src={cat.image} alt={cat.category} className="w-full h-full object-cover absolute top-0 left-0 z-0" />
                <div className="pt-16 absolute top-0 left-0 w-full h-full bg-[--accent-color-light] z-10 clip-triangle flex flex-col justify-center items-end pr-6">
                  <p className="text-xl font-bold text-black pt-20">{cat.category}</p>
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
