import { useState, useEffect } from 'react'
import Image from 'next/image'
import linkIcon from '@/components/icons/linkIcon.svg'

export default function Footer ({ data }) {
  const { name, country } = data.location
  const [user, setUser] = useState('')
  const [urlImg, setUrlImg] = useState('')

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
        const query = orientation === 'landscape' ? 'orientation=landscape' : 'orientation=portrait'

        const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${name}-${country}&${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`)
        const data = await response.json()

        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length)
          const imageUrl = data.results[randomIndex].urls.regular
          setUser(data.results[randomIndex].user.name)
          setUrlImg(data.results[randomIndex].links.html)
          const img = new Image()
          img.onload = () => {
            document.body.style.backgroundImage = `url(${imageUrl})`
            document.body.style.backgroundSize = 'cover'
          }
          img.src = imageUrl
        }
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchImage()
  }, [name, country])

  return (
    <>
      {user && urlImg && (
        <footer className='card flex gap-1 text-indigo-800 p-2 px-3 rounded-full mt-auto text-sm'>
          <Image
            src={linkIcon}
            height={16}
            width={16}
            alt='link icon'
          />
          <span>Photo by</span>
          <a
            href={urlImg}
            className='underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            {user}
          </a>
          <span>on</span>
          <a
            href='https://unsplash.com/es?utm_source=WeatherApp&utm_medium=referral'
            className='underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            Unsplash
          </a>
        </footer>
      )}
    </>
  )
}
