import { API } from '@/constant'
import axios from 'axios'
import React, { useState } from 'react'

const MoviePage = () => {
  const [movieData, setMovieData] = useState(null);
  
  
  // Write logic
  axios
    .get(`${API}/Movies`, {headers: {'Access-Control-Allow-Origin' : '*'}})
    .then(response => {
      console.log(response);
      setMovieData(response) // config here
    })
    .catch(error => {
      console.log('An error occurred:', error.response)
    })



  // Render UI
  return (




    <div>MoviePage</div>
  )
}

export default MoviePage