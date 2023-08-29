'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Weather } from '@/components/Current/Weather'
import { WeatherChart } from '@/components/Current/WeatherChart'
import searchIcon from '@/components/icons/searchIcon.svg'
import sadCloud from '@/components/icons/sadCloud.svg'

export default function Home () {
  const [city, setCity] = useState('')
  const [data, setData] = useState({})
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

  const fetchWeather = () => {
    if (!city.trim()) return
    setLoading(true)

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
      })
      .catch((err) => {
        console.error('ERROR -> ', err)
      })
      .finally(() => {
        setLoading(false)
        setCity('')
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchWeather()
  }

  return (
    <main className='flex min-h-screen flex-col items-center md:p-24 p-8 text-indigo-800 lg:max-w-6xl lg:mx-auto'>
      <div className='card flex flex-col items-center w-full p-2'>
        <form className='flex items-center p-2 w-full md:w-auto' onSubmit={handleSubmit}>
          <div className='relative w-full'>
            <input
              className='w-full md:text-xl text border rounded-full pl-4 p-2 text-indigo-800 bg-transparent focus:outline-none placeholder-indigo-800 placeholder-opacity-80'
              type='text'
              placeholder='City'
              onChange={(e) => setCity(e.target.value)}
              autoFocus
            />
            <Image
              priority
              src={searchIcon}
              height={32}
              width={32}
              alt='search icon'
              className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
              onClick={fetchWeather}
            />
          </div>
        </form>
        {!data.current && loading && <p className='text-2xl'>Loading...</p>}
        {data.current && <Weather data={data} />}
        {data.forecast && <WeatherChart data={data.forecast.forecastday[0].hour} localTime={data.location.localtime} />}
        {data.error &&
          <section className='flex flex-col items-center'>
            <Image
              priority
              src={sadCloud}
              height={256}
              width={256}
              alt='sad cloud'
              onClick={fetchWeather}
            />
            <p className='text-2xl'>
              {data.error.message}
            </p>
          </section>}
      </div>
    </main>
  )
}
