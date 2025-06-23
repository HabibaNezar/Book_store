import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function BookDetails() {

  let { bookId } = useParams()

  function getBookDetails() {
    return axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyAkmjT7KZ4hNIlPsZKVlfZTiUMjJfO7mlI`)
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['bookDetails', bookId],
    queryFn: getBookDetails,
  })

  if (isLoading) {
    return (
      <div className="p-8 animate-pulse space-y-4">
        <div className="h-64 bg-gray-300 rounded w-full"></div>
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-600 p-4">Something went wrong!</p>
  }

  const book = data?.data?.volumeInfo
  const saleInfo = data?.data?.saleInfo

  return (
    <div className="w-screen md:mx-28 flex justify-between gap-28">
      <div className='w-1/4'>
        <img src={book.imageLinks?.thumbnail} alt={book.title} className="w-full rounded shadow "/>
      </div>
      <div className='w-3/4 flex flex-col gap-3 md:mr-28'> 
        <h1 className="text-3xl font-bold text-[--text-color]">{book.title}</h1>
        <p className="text-lg text-gray-700">By: {book.authors?.join(', ') ?? 'Unknown'}</p>
        <p className="text-gray-800">{book.description ?? 'No description available.'}</p>
        <p className="text-sm text-gray-600">Published: {book.publishedDate}</p>
        <p className="text-sm text-gray-600">Publisher: {book.publisher ?? 'Unknown'}</p>
        <p className="text-sm text-gray-600">Pages: {book.pageCount ?? 'N/A'}</p>
        <a href={book.previewLink} target="_blank" rel="noreferrer" className="text-[--accent-color] underline font-medium">Preview Book</a>
        {saleInfo?.buyLink && (
            <a
            href={saleInfo.buyLink}
            target="_blank"
            rel="noreferrer"
            className="block mt-2 text-green-600 underline font-medium"
            >
            Buy Book
            </a>
        )}
      </div>
    </div>
  )
}
