import React, { useEffect, useState } from 'react'

const MovieEpisodeList = movie => {
  console.log(movie.movie)
  const [movieEpisodes, setMovieEpisodes] = useState([])

  useEffect(() => {
    setMovieEpisodes(movie.movie)
  })
  const divStyle = {
    color: 'white',
    padding: '.625rem',
    height: '500px',
  }
  const h2Style = {
    fontSize: '20px',
    marginBottom: '10px',
  }
  const hrStyle = {
    margin: '10px 0',
  }
  const listItemStyle = {
    fontSize: '12px',
    cursor: 'pointer',
    borderBottom: '0.5px solid black',
    padding: '2px',
    transition: 'color 0.3s',
  }
  const buttonStyle = {
    marginTop: '10px',
    color: 'white',
    fontSize: '12px',
  }
  return (
    <div style={divStyle} className='bg-white rounded'>
      <h2 style={h2Style} className='text-teal-800'>
        Latest Episodes
      </h2>
      <hr style={hrStyle} />
      <ul>
        {movieEpisodes.map((episode, index) => (
          <li key={index} style={listItemStyle} className='text-gray-800 mt-4'>
            <a href='#'></a>
            {episode.movieName} - episodes {episode.totalEpisodes}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieEpisodeList
