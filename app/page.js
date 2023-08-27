'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Weather } from '@/components/Current/Weather'
import { WeatherChart } from '@/components/Current/WeatherChart'
import searchIcon from '@/components/icons/searchIcon.svg'

export default function Home () {
  const [city, setCity] = useState('palma')
  const [weather, setWeather] = useState({})
  // const [units, setUnits] = useState('metric')
  const [loading, setLoading] = useState(false)

  // https://rapidapi.com/weatherapi/api/weatherapi-com
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3&alerts=yes`

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  }

  const fetchWeather = (e) => {
    if (e) e.preventDefault()
    setLoading(true)

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data)
      })
      .catch((err) => {
        console.error('ERROR -> ', err)
      })
      .finally(() => {
        setLoading(false)
        setCity('')
      })
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  return (
    <main className='flex min-h-screen flex-col items-center md:p-24 p-8 text-indigo-800 lg:max-w-6xl lg:mx-auto'>
      <div className='card flex flex-col items-center w-full p-2'>
        <form className='flex items-center p-2 w-full md:w-auto'>
          <div className='relative w-full'>
            <input
              className='w-full md:text-2xl text border rounded-full pl-4 p-2 text-indigo-800 bg-transparent focus:outline-none placeholder-indigo-800'
              type='text'
              placeholder='City'
              onChange={(e) => setCity(e.target.value)}
            />
            <Image
              priority
              src={searchIcon}
              height={32}
              width={32}
              alt='search icon'
              className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer '
              onClick={fetchWeather}
            />
          </div>
        </form>
        {loading && <p className='text-2xl'>Loading...</p>}
        {weather.current && <Weather data={weather} />}
        {weather.forecast && <WeatherChart data={weather.forecast.forecastday[0].hour} />}
        {weather.error && <p className='text-2xl'>{weather.error.message}</p>}
      </div>
    </main>
  )
}
