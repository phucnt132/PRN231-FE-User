'use client'
import Link from 'next/link'
import {
  Avatar,
  Card,
  Carousel,
  Pagination,
  Space,
  Typography,
} from '@douyinfe/semi-ui'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Comment_API, Movie_API, headerConfig } from '@/constant'
import Rating from '@/components/Rating/rating'
import MovieEpisodeList from '@/components/MovieEpisodeList/MovieEpisodeList'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, TextInput } from 'flowbite-react'
import { useAuthContext } from '@/context/AuthContext'

export interface Movie {
  movieId: number
  postedByUser: number
  movieName: string
  movieThumnailImage: string
  moviePoster: string
  listEpisode: string
  totalEpisodes: number
  description: string
  releasedYear: string
  aliasName: string
  director: string
  mainCharacters: string
  trailer?: string
  comments?: string
  isActive: boolean
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [spinner, setSpinner] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const moviesPerPage = 5

  useEffect(() => {
    // Fetching movie
    axios
      .get(`${Movie_API}`, {
        headers: headerConfig,
      })
      .then(response => {
        setMovies(response.data.data)
        setSpinner(false)
      })
      .catch(error => {
        setSpinner(true)
        console.log('An error occurred:', error.response)
      })
  }, [])

  const { Meta } = Card

  const style = {
    width: '100%',
    height: '400px',
  }

  const imgList = [
    'https://pic-bstarstatic.akamaized.net/ugc/73e8e097b338e8b85ea5f035a4273a442c708fa0.jpg',
    'https://misskick.vn/wp-content/uploads/2023/08/top-phim-bo-my-hay-nhat-2020-8-800x450-1.png',
  ]

  const totalMovies = movies.length
  const totalPages = Math.ceil(totalMovies / moviesPerPage)
  const lastMovieIndex = currentPage * moviesPerPage
  const firstMovieIndex = lastMovieIndex - moviesPerPage
  const currentMovies = movies.slice(firstMovieIndex, lastMovieIndex)

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }

  const handleRouterPage = () => {}

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <Carousel style={style} className='mx-0 !absolute' theme='dark'>
        {imgList.map((src, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundSize: 'cover',
                backgroundImage: `url(${src})`,
              }}
            ></div>
          )
        })}
      </Carousel>

      {/*  movie content */}
      <div className='grid grid-cols-5 gap-5 mb-6 pb-4 w-fit bg-gray-100 p-4 rounded mt-[420px]'>
        <div className='col-span-4'>
          <div className='mb-6 pb-4 border-b border-primary text-primary text-2xl'>
            <h3 className='bg-red-600 w-fit p-1 rounded text-white'>
              New Movie
            </h3>
          </div>
          <div className='grid grid-cols-5 gap-10 mb-6 pb-4'>
            {currentMovies.map((movie, index) => (
              <Card
                style={{ maxWidth: 200 }}
                cover={
                  <img alt='example' src={movie.moviePoster} className='h-60' />
                }
              >
                {/* <Meta className='text-center' title={movie.movieName} /> */}
                <a
                  href={`/movie/${movie.movieId}`}
                  className='hover:text-blue-600 text-gray-800 font-bold'
                >
                  {movie.movieName}
                </a>
                <p className='mt-3 text-xs'>{movie.aliasName}</p>
              </Card>
            ))}
          </div>
          <div className='flex justify-center'>
            <Pagination
              total={totalMovies}
              pageSize={moviesPerPage}
              onChange={handlePageChange}
              style={{ marginBottom: 12 }}
            />
          </div>
        </div>
        <div className='col-span-1'>
          <MovieEpisodeList movie={movies} />
        </div>
      </div>
    </main>
  )
}
