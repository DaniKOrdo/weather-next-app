import { useEffect } from 'react'
import Image from 'next/image'
import { InfoSection } from '@/components/Current/InfoSection.jsx'
import pointerMapIcon from '@/components/icons/pointerMapIcon.svg'
import { WEATHER_CODES } from '@/components/Const.js'

export function Weather ({ data }) {
  const { name, region, country } = data.location
  const { temp_c: tempC } = data.current
  const { text } = data.current.condition

  function getWeatherIcon (code) {
    if (data.current && data.current.condition) {
      const isNight = data.current.is_day === 0
      const iconName = isNight ? (WEATHER_CODES[code]?.[1] || WEATHER_CODES[code]?.[0]) : WEATHER_CODES[code]?.[0]

      return `/weather/${iconName}.svg`
    }
    return ''
  }

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
        const query = orientation === 'landscape' ? 'orientation=landscape' : 'orientation=portrait'

        const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${name}-${country}&${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`)
        const data = await response.json()
        console.log(data)

        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length)
          const imageUrl = data.results[randomIndex].urls.regular
          document.body.style.backgroundImage = `url(${imageUrl})`
          document.body.style.backgroundSize = 'cover'
        }
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchImage()
  }, [name, country])

  console.log(data)

  return (
    <>
      <p className='flex gap-1'>
        <Image
          src={pointerMapIcon}
          height={16}
          width={16}
          alt='pointer map icon'
        />
        {name}, {region}, {country}
      </p>
      <p className='relative text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-500'>
        {Math.round(tempC)}&#176;
        <span className='absolute -top-0 -right-16 opacity-95'>
          <Image
            src={getWeatherIcon(data.current.condition.code)}
            alt={text}
            height={165}
            width={165}
          />
        </span>
      </p>

      <div className='flex items-center text-center'>
        <p className='text-indigo-900 font-medium'>{text}</p>
      </div>

      <InfoSection data={data} />
    </>
  )
}
