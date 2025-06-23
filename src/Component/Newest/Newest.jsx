import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Newest() {
  function getBooksByLang() {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=a&langRestrict=ar&orderBy=newest&printType=books&maxResults=20&key=AIzaSyAkmjT7KZ4hNIlPsZKVlfZTiUMjJfO7mlI`)
  }

const { data, isLoading, error } = useQuery({
    queryKey: ['booksbyLang'],
    queryFn: getBooksByLang,
})

if (isLoading) return <p>Loading...</p>
if (error) return <p>Error fetching books for</p>

return (
    <div className='bg-[--background-color]'>
        <div className='md:mx-28'>
            <h2 className='text-[--text-color] text-5xl py-2 font-medium'>
                Discover Our <span className='text-[--accent-color]'>Newest</span> Books
            </h2>

            <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 gap-6 my-8">
                {data?.data?.items?.map((book) => (
                    <NavLink to={`/bookDetails/${book.id}`} key={book.id}>
                        <div className="bg-white p-4 rounded shadow h-[400px] flex flex-col justify-between border-2 border-[--accent-color] md:m-0 m-10">
                            {book.volumeInfo.imageLinks?.thumbnail && (
                                <img
                                    className="mt-2 w-full h-64 object-cover"
                                    src={book.volumeInfo.imageLinks.thumbnail}
                                    alt={book.volumeInfo.title}
                                />
                            )}
                            <h4 className="font-semibold text-lg mt-2">
                                {book.volumeInfo.title.split(' ').slice(0, 5).join(' ') +
                                    (book.volumeInfo.title.split(' ').length > 5 ? '...' : '')}
                            </h4>
                            <p className="text-sm text-gray-600">{book.volumeInfo.authors?.join(', ')}</p>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    </div>
)
}
