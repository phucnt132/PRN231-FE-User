'use client'
import Link from 'next/link'
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Space,
  Typography,
} from '@douyinfe/semi-ui'
import Meta from '@douyinfe/semi-ui/lib/es/card/meta'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Movie_API, headerConfig } from '@/constant'

interface Moive {
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
  const [movies, setMovies] = useState<Moive[]>([])
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    // Fetching movie
    axios
      .get(`${Movie_API}`, {
        headers: headerConfig,
      })
      .then(response => {
        console.log(response.data.data)
        setMovies(response.data.data)
        setSpinner(false)
      })
      .catch(error => {
        setSpinner(true)
        console.log('An error occurred:', error.response)
      })
  }, [])

  console.log(movies)

  const { Title, Paragraph } = Typography
  const { Meta } = Card

  const style = {
    width: '100%',
    height: '400px',
  }

  const titleStyle = {
    //position: 'absolute',
    top: '100px',
    left: '100px',
    color: '#1C1F23',
  }

  const colorStyle = {
    color: '#1C1F23',
  }

  const renderLogo = () => {
    return (
      <img
        src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/semi_logo.svg'
        alt='semi_logo'
        style={{ width: 87, height: 31 }}
      />
    )
  }

  const imgList = [
    'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-1.png',
    'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-2.png',
    'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-3.png',
  ]

  const textList = [
    [
      'Semi Design System Management',
      'From Semi Design, To Any Design',
      'Quickly define your design system and apply it to design drafts and code',
    ],
    [
      'Semi Material',
      'Customized components for business scenarios, support online preview and debugging',
      'Content co-authored by Semi Design users',
    ],
    [
      'Semi Template',
      'Efficient Design2Code converts design into real code in seconds',
      'One-click conversion of massive page template front-end code',
    ],
  ]

  const movieDatas = [
    {
      src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg',
      title: 'Batman Begins',
      main: 'Christian Bale',
      runtime: '120m',
    },
    {
      src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg',
      title: 'Batman Begins',
      main: 'Christian Bale',
      runtime: '120m',
    },
    {
      src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg',
      title: 'Batman Begins',
      main: 'Christian Bale',
      runtime: '120m',
    },
    {
      src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg',
      title: 'Batman Begins',
      main: 'Christian Bale',
      runtime: '120m',
    },
    {
      src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg',
      title: 'Batman Begins',
      main: 'Christian Bale',
      runtime: '120m',
    },
    {
      src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg',
      title: 'Batman Begins',
      main: 'Christian Bale',
      runtime: '120m',
    },
  ]

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <Carousel style={style} className='' theme='dark'>
        {imgList.map((src, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundSize: 'cover',
                backgroundImage: `url(${src})`,
              }}
            >
              <Space
                vertical
                align='start'
                spacing='medium'
                style={titleStyle}
                className='position: absolute'
              >
                {renderLogo()}
                <Title heading={2} style={colorStyle}>
                  {textList[index][0]}
                </Title>
                <Space vertical align='start'>
                  <Paragraph style={colorStyle}>{textList[index][1]}</Paragraph>
                  <Paragraph style={colorStyle}>{textList[index][2]}</Paragraph>
                </Space>
              </Space>
            </div>
          )
        })}
      </Carousel>
      {/*  movie content */}
      <div className='grid grid-cols-5 gap-5 mb-6 pb-4 mt-6 w-[100%] bg-gray-100 p-4'>
        <div className='col-span-4'>
          <div className='mb-6 pb-4 border-b border-primary text-primary text-2xl'>
            <h3 className='bg-red-600 w-fit p-1 rounded text-white'>
              New Movie
            </h3>
          </div>
          <div className='grid grid-cols-5 gap-10 mb-6 pb-4'>
            {movies.map((movie, index) => (
              <Card
                style={{ maxWidth: 200 }}
                cover={
                  <img alt='example' src={movie.moviePoster} className='h-60' />
                }
              >
                <Meta className='text-center' title={movie.movieName} />
                <p className='mt-3 text-xs'>{movie.aliasName}</p>
              </Card>
            ))}
          </div>
          <div className='flex justify-center'>
            <button className='btn hover:scale-125 transition ease-out duration-500 bg-white p-1 rounded'>
              Load more...
            </button>
          </div>
        </div>
        <div className='col-span-1 bg-gray-700'>
          <h3>Movie Table</h3>
        </div>
      </div>
    </main>
    
  )
}
