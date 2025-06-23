import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import img2 from '../../assets/img2.jpg'
import { NavLink } from 'react-router-dom'

export default function Home() {
    const categories = ['self-development', 'technology', 'science', 'history', 'fiction']
    const API_KEY = 'AIzaSyAkmjT7KZ4hNIlPsZKVlfZTiUMjJfO7mlI'

    const [favorites, setFavorites] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])

    function getBooks() {
        return Promise.all(
            categories.map(cat =>
                axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${cat}&maxResults=8&key=${API_KEY}`)
                    .then(res => ({ category: cat, items: res.data.items }))
            )
        )
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['books'],
        queryFn: getBooks,
    })

    if (isLoading) return <p className='w-screen h-screen text-center'>Loading...</p>
    if (error) return <p>Something went wrong</p>

    const allBooks = data.flatMap(catData => catData.items)

    const toggleFavorite = (bookId) => {
        setFavorites((prevFavs) =>
            prevFavs.includes(bookId)
                ? prevFavs.filter(id => id !== bookId)
                : [...prevFavs, bookId]
        )
    }

    // دالة تعمل سيرش
    const handleSearch = async () => {
        if (searchTerm.trim() === "") return;

        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&langRestrict=ar&orderBy=newest&printType=books&maxResults=20&key=${API_KEY}`
            );
            setSearchResults(response.data.items || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }

    // لما تدوسي Enter في الانبوت
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const booksToShow = searchResults.length > 0 ? searchResults : allBooks;

    return (
        <>
            <div className='flex justify-center items-center md:mt-32 mt-20'>
                <img className='w-screen h-3/4 -z-10 object-cover absolute md:top-32 top-10' src={img2} alt="" />
                <div className='w-screen h-3/4 -z-10 object-cover absolute md:top-32 top-10 bg-black/40'></div>
                <div className='text-center m-auto'>
                    <p className='shadow-xl text-[--background-color] text-4xl md:text-6xl font-black'>
                        Welcome to the world's largest online book library
                    </p>
                    <p className='pt-10 text-[--background-color] text-xl md:text-2xl font-normal'>
                        take a scan, dive in, and fall in love with your next great read!
                    </p>
                </div>
            </div>

            <div className='bg-[--background-color]'>
                <div className='md:mt-48 md:mx-28'>
                    <div className='md:flex items-baseline'>
                        <h2 className=' md:w-auto whitespace-nowrap text-[--text-color] text-5xl py-2 font-medium'>Discover Our Books</h2>

                        {/* Search Bar */}
                        <div className='flex justify-center items-center self-center ml-8 w-3/4' >
                            <input
                                type="text"
                                placeholder="🔍Search..."
                                className='p-2 border-2 border-[--accent-color] rounded-l-md md:w-full'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                onClick={handleSearch}
                                className='bg-[--accent-color] text-white p-2 rounded-r-md hover:bg-opacity-80 border-2 border-[--accent-color]'
                            >
                                search
                            </button>
                        </div>
                    </div>

                    {/* Books grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-8">
                        {booksToShow.map((book) => {
                            const bookId = book.id;
                            const isFav = favorites.includes(bookId);

                            return (
                                <NavLink to={`/bookDetails/${bookId}`} key={bookId}>
                                    <div
                                        className="bg-white p-4 rounded shadow-md border-2 border-[--accent-color] flex flex-col h-[420px] hover:scale-105 transition-transform duration-300"
                                    >
                                        {book.volumeInfo.imageLinks?.thumbnail ? (
                                            <img
                                                className="w-full h-64 object-cover rounded"
                                                src={book.volumeInfo.imageLinks.thumbnail}
                                                alt={book.volumeInfo.title}
                                            />
                                        ) : (
                                            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded">
                                                <span className="text-gray-500 text-sm">No Image</span>
                                            </div>
                                        )}

                                        <div className="flex flex-col justify-between flex-grow mt-4">
                                            <h4 className="font-semibold text-lg text-[--text-color] line-clamp-2">
                                                {book.volumeInfo.title}
                                            </h4>

                                            <div className="flex items-center gap-4 mt-2 relative">
                                                <p className="text-sm text-gray-600 truncate max-w-[80%]">
                                                    {book.volumeInfo.authors?.join(', ') ?? 'Unknown'}
                                                </p>
                                                <div className="flex items-center gap-3 absolute right-0">
                                                    <i
                                                        onClick={() => toggleFavorite(bookId)}
                                                        className={`fa-${isFav ? 'solid' : 'regular'} fa-heart text-xl text-[--accent-color] cursor-pointer transition-colors duration-300 hover:scale-110`}
                                                    ></i>
                                                    <i className="fa-solid fa-plus text-[--accent-color] cursor-pointer transition-transform duration-300 hover:rotate-90 hover:scale-110"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
