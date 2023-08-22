'use client'
import { useEffect, useState } from 'react'
// import Image from 'next/image'

import { Weather } from '@/components/Weather'

export default function Home () {
  const [city, setCity] = useState('palma')
  const [weather, setWeather] = useState({})
  const [units, setUnits] = useState('metric')
  const [loading, setLoading] = useState(false)

  // https://openweathermap.org/current
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`

  const fetchWeather = (e) => {
    // e.preventDefault()
    setLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data)
        setLoading(false)
      })
    setCity('')
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1 className='text-4xl'>Weather Next App</h1>
      {weather.main && <Weather data={weather} />}
    </main>
  )
}
