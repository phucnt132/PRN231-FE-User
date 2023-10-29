'use client'
import { Comment_API, Episode_API, Movie_API, headerConfig } from '@/constant'
import { getToken, getUserId } from '@/helpers'
import axios from 'axios'
import { Button, Card, Label, Spinner, TextInput } from 'flowbite-react'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
const MovideDetailPage = () => {
  const [episodes, setEpisode] = useState(null)
  const [movie, setMovie] = useState(null)
  const [comments, setComments] = useState([])
  const [spinner, setSpinner] = useState(true)
  const currentUrl = window.location.href
  const lastSegment = currentUrl.split('/').pop()
  const isLogin = getToken()
  const userId = getUserId()
  const movieId = lastSegment

  const formik = useFormik({
    initialValues: {
      commentContent: '',
      rating: 1,
      userId: userId,
      movieId: movieId,
    },
    validationSchema: Yup.object({
      commentContent: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      setSpinner(true)
      axios
        .post(`${Comment_API}/create`, values, {
          headers: headerConfig,
        })
        .then(response => {
          console.log(response)
          handleFetchComment()
          setSpinner(false)
        })
        .catch(error => {
          // Handle error.
          setSpinner(false)
          console.log('An error occurred:', error.response)
        })
    },
  })

  const handleFetchComment = () => {
    // Fetching Comment of movie
    axios
      .get(`${Comment_API}/movieId?movieId=${movieId}`, {
        headers: headerConfig,
      })
      .then(response => {
        // Navigation to homepage
        setComments(response.data.data)
      })
      .catch(error => {
        console.log('An error occurred:', error.response)
      })
  }

  useEffect(() => {
    // Fetching movie
    axios
      .get(`${Movie_API}/id?id=${movieId}`, {
        headers: headerConfig,
      })
      .then(response => {
        console.log(response.data.data)
        setMovie(response.data.data)
        setSpinner(false)
      })
      .catch(error => {
        setSpinner(true)
        console.log('An error occurred:', error.response)
      })

    // Fetching Episode of movie
    axios
      .get(`${Episode_API}/movieId?movieId=${movieId}`, {
        headers: headerConfig,
      })
      .then(response => {
        // Navigation to homepage
        setEpisode(response.data.data)
      })
      .catch(error => {
        console.log('An error occurred:', error.response)
      })

    handleFetchComment()
  }, [])

  if (spinner) return <Spinner aria-label='Spinner button example' />
  // Render UI
  return (
    <div className='flex flex-col gap-4 my-4'>
      <h3 className='text-2xl font-semibold text-center'>{movie.movieName}</h3>
      <div className='flex gap-4'>
        <div className='w-3/12'>
          <Card
            imgAlt='Meaningful alt text for an image that is not purely decorative'
            imgSrc={`${movie?.movieThumnailImage}`}
          >
            <h3 className='text-center font-semibold'>Số lượng tập</h3>
            <Button color='purple'>{movie.totalEpisodes}</Button>
          </Card>
        </div>
        <div className='w-9/12 flex flex-col gap-2'>
          <div className='flex gap-4'>
            <p className='font-semibold'>Tên khác: </p>
            <p>{movie.aliasName}</p>
          </div>

          <div className='flex gap-4'>
            <p className='font-semibold'>Đạo diễn: </p>
            <p>{movie.director}</p>
          </div>

          <div className='flex gap-4'>
            <p className='font-semibold'>Các nhân vật: </p>
            <p>{movie.mainCharacters}</p>
          </div>

          <div className='flex gap-4'>
            <p className='font-semibold min-w-[6rem]'>Mô tả phim: </p>
            <p className='overflow-y-scroll h-36'>{movie.description}</p>
          </div>

          <div className='flex gap-4'>
            <p className='font-semibold'>Năm sản xuất: </p>
            <p>{movie.releasedYear}</p>
          </div>

          <div className='flex gap-4'>
            <p className='font-semibold'>Danh sách tập: </p>
            <div className='flex gap-4'>
              {
                episodes?.map((item, idx) => 
                  <Link href={`/${item.episodeId}`}>
                    <Button color='failure'>{idx}</Button>
                  </Link>
                )
              }
   
            </div>
          </div>
        </div>
      </div>

      <Card>
        <div className='mb-4 flex items-center justify-between'>
          <h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
            Các bình luận
          </h5>
          <a
            className='text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500'
            href='#'
          >
            <p>Xem tất cả</p>
          </a>
        </div>

        <div className='flow-root'>
          <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
            {comments.map(comment => (
              <li className='py-3 sm:py-4'>
                <div className='flex items-start space-x-4'>
                  <div className='shrink-0'>
                    <img
                      alt='Avatar image'
                      className='rounded-lg aspect-square !h-[100px] !w-[100px]'
                      src='https://i.pinimg.com/564x/f7/44/e7/f744e7bd579098a9c9bb606e05608636.jpg'
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                      {comment.commentedDate}
                    </p>
                    <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                      {comment.userId}
                    </p>
                    <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                      {comment.commentContent}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card className='w-fit'>
        <form onSubmit={formik.handleSubmit} className='grid grid-cols-5 gap-5'>
          <TextInput
            id='commentContent'
            name='commentContent'
            type='text'
            placeholder='Enter your comment here'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.commentContent}
            className='col-span-4'
          />
          <input
            id='rating'
            name='rating'
            type='number'
            placeholder='Enter your password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rating}
            hidden
          />
          <input
            id='userId'
            name='userId'
            type='number'
            placeholder='Enter your password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userId}
            hidden
          />
          <input
            id='movieId'
            name='movieId'
            type='number'
            placeholder='Enter your password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.movieId}
            hidden
          />
          <Button
            type='submit'
            color='dark'
            size='sm'
            className='w-fit col-span-1'
          >
            {isLogin ? (
              <>Comment</>
            ) : (
              <a href='/auth/login'>Login to write comment</a>
            )}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default MovideDetailPage
