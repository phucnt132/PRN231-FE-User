import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Pagination from 'swiper'

const MovieSwiper = ({ movies }) => {
  const swiperOptions = {
    slidesPerView: 5,
    spaceBetween: 15,
    freeMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  }
  const swiperRef = useRef(null)

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }

  return (
    <div className='h-[300px] w-full mx-auto'>
      <Swiper
        {...swiperOptions}
        onSwiper={swiper => (swiperRef.current = swiper)}
      >
        {movies.map(movie => (
          <SwiperSlide key={movie.movieId}>
            <div className='group relative shadow-lg text-white rounded-xl p-6 w-full h-[300px] overflow-hidden cursor-pointer mx-2'>
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{ backgroundImage: `url(${movie.moviePoster})` }}
              />
              <div className='absolute inset-0 group-hover:opacity-30' />
              <div className='absolute bottom-0 left-0 p-4'>
                <h1 className='text-xl font-bold'>{movie.movieName}</h1>
                <p className='text-lg'>{movie.aliasName}</p>
              </div>
              <div className='absolute top-0 right-0 p-4'>
                <div className='w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100'>
                  &rarr;
                </div>
              </div>
              <div className='absolute top-1 left-1 p-2 text-lg font-bold bg-black opacity-60 text-white rounded-full'>
                {movie.totalEpisodes}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className='swiper-button-prev' onClick={handlePrev}></div>
        <div className='swiper-button-next' onClick={handleNext}></div>
      </Swiper>
    </div>
  )
}

export default MovieSwiper
