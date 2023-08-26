'use client'
import { useEffect, useState } from 'react'
// import Image from 'next/image'

import { Weather } from '@/components/Current/Weather'
import { WeatherChart } from '@/components/Current/WeatherChart'

export default function Home () {
  const [city, setCity] = useState('palma')
  const [weather, setWeather] = useState({})
  const [units, setUnits] = useState('metric')
  const [loading, setLoading] = useState(false)

  // https://openweathermap.org/current
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`

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

    setLoading(false)
    setCity('')
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='card flex flex-col items-center w-full p-2'>
        <form className='flex items-center p-2' onSubmit={fetchWeather}>
          <input
            className='text-2xl border rounded-full pl-5 p-2 text-black bg-transparent focus:outline-none placeholder-black'
            type='text'
            placeholder='City'
            onChange={(e) => setCity(e.target.value)}
          />
          {/* <div className='flex mt-4'>
            <label className='mr-2' htmlFor='metric'>
              <input
                className='mr-2'
                type='radio'
                name='units'
                id='metric'
                value='metric'
                checked={units === 'metric'}
                onChange={(e) => setUnits(e.target.value)}
              />
              Metric
            </label>
            <label htmlFor='imperial'>
              <input
                className='mr-2'
                type='radio'
                name='units'
                id='imperial'
                value='imperial'
                checked={units === 'imperial'}
                onChange={(e) => setUnits(e.target.value)}
              />
              Imperial
            </label>
          </div>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
            type='submit'
          >
            Search
          </button> */}
        </form>
        {loading && <p className='text-2xl'>Loading...</p>}
        {weather.current && <Weather data={weather} />}
        {weather.forecast && <WeatherChart data={weather.forecast.forecastday[0].hour} />}
        {weather.error && <p className='text-2xl'>{weather.error.message}</p>}
      </div>
    </main>
  )
}
