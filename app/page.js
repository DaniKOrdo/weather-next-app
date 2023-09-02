'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Weather } from '@/components/Current/Weather'
import { WeatherChart } from '@/components/Current/WeatherChart'
import searchIcon from '@/components/icons/searchIcon.svg'
import sadCloud from '@/components/icons/sadCloud.svg'

export default function Home () {
  const cities = ['Mallorca', 'Japan', 'London', 'Buenos Aires']
  const [city, setCity] = useState('')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [noDataAvailable, setNoDataAvailable] = useState(false)

  const fetchWeather = (queryCity) => {
    if (!queryCity) return
    setLoading(true)

    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${queryCity}&days=3&alerts=yes`
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    }

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setNoDataAvailable(!data.forecast || data.forecast.forecastday.length === 0)
      })
      .catch((err) => {
        console.error('ERROR -> ', err)
        setNoDataAvailable(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSearch = () => {
    fetchWeather(city)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Evitar enviar el formulario por defecto
      fetchWeather(city)
    }
  }

  const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        setCity(`${latitude},${longitude}`)
        fetchWeather(`${latitude},${longitude}`)
      },
      function (error) {
        console.error('Geolocation error:', error)
        setCity(getRandomCity())
        fetchWeather(getRandomCity())
      }
    )
  }

  const getRandomCity = () => {
    return cities[Math.floor(Math.random() * cities.length)]
  }

  useEffect(() => {
    handleGeolocation()
  }, [])

  return (
    <main className='flex min-h-screen flex-col items-center md:p-24 p-8 text-indigo-800 lg:max-w-6xl lg:mx-auto'>
      <div className='card flex flex-col items-center w-full p-2'>
        <form className='flex items-center p-2 w-full md:w-auto'>
          <div className='relative w-full'>
            <input
              className='w-full md:text-xl text border rounded-full pl-4 p-2 pr-12 text-indigo-800 bg-transparent focus:outline-none placeholder-indigo-800 placeholder-opacity-80'
              type='text'
              placeholder='City'
              // value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <Image
              priority
              src={searchIcon}
              height={32}
              width={32}
              alt='search icon'
              className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
              onClick={handleSearch}
            />
          </div>
        </form>
        {!data.current && loading && <p className='text-2xl'>Loading...</p>}
        {data.current && <Weather data={data} />}
        {noDataAvailable && !loading && (
          <p className='text-2xl'>No forecast data available.</p>
        )}
        {data.forecast && data.forecast.forecastday.length > 0 && (
          <WeatherChart data={data.forecast.forecastday[0].hour} localTime={data.location.localtime} />
        )}
        {data.error && (
          <section className='flex flex-col items-center'>
            <Image
              priority
              src={sadCloud}
              height={256}
              width={256}
              alt='sad cloud'
              onClick={handleSearch}
            />
            <p className='text-2xl'>{data.error.message}</p>
          </section>
        )}
      </div>
    </main>
  )
}
