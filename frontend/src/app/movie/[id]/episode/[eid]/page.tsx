'use client'
import { Episode_API, Movie_API, headerConfig } from '@/constant'
import axios from 'axios'
import { Button, Card, Spinner } from 'flowbite-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
const EpisodePage = () => {
  const [episode, setEpisode] = useState(null)
  const [episodes, setEpisodes] = useState(null)
  const [movie, setMovie] = useState(null)
  const [spinner, setSpinner] = useState(true)
  const currentUrl = typeof window == 'undefined' ? '' : window.location.href
  const parts = currentUrl.split('/')
  const movieId = parts[4]
  const lastSegment = parts[6]
  const episodeId = lastSegment

  console.log(episodeId)

  useEffect(() => {
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

    axios
      .get(`${Episode_API}/id?id=${episodeId}`, {
        headers: headerConfig,
      })
      .then(response => {
        console.log(response.data.data)
        console.log(response.data.data.mediaLink)
        setEpisode(response.data.data)
        setSpinner(false)
      })
      .catch(error => {
        setSpinner(true)
        console.log('An error occurred:', error.response)
      })

    axios
      .get(`${Episode_API}/movieId?movieId=${movieId}`, {
        headers: headerConfig,
      })
      .then(response => {
        console.log(response.data.data)
        setEpisodes(response.data.data)
        setSpinner(false)
      })
      .catch(error => {
        setSpinner(true)
        console.log('An error occurred:', error.response)
      })
  }, [])

  if (spinner) return <Spinner aria-label='Spinner button example' />
  // Render UI
  // Render UI
  return (
    <div className='flex flex-col gap-4 my-4'>
      {episode == null || movie == null ? (
        <Spinner aria-label='Spinner button example' />
      ) : (
        <>
          <div>
            {movie.movieName}
          </div>
          <iframe
            width='854'
            height='480'
            src={`${episode.mediaLink}`}
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowfullscreen='true'
          ></iframe>
        </>
      )}
      <div className='flex gap-4'>
        <p className='font-semibold'>Danh sách tập: </p>
        <div className='flex gap-4 flex-wrap'>
          {episodes == null ? (
            <Spinner aria-label='Spinner button example' />
          ) : (
            episodes?.map((item, idx) => (
              <Link href={`${movieId}/episode/${item.episodeId}`}>
                <Button key={idx} color='failure'>
                  {item.episodeName}
                </Button>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default EpisodePage
