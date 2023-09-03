'use client'
import { useState, useEffect } from 'react'
import InputForm from '@/components/InputForm'
import WeatherDisplay from '@/components/WeatherDisplay'
import Footer from '@/components/Footer'

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
        console.log('DATA -> ', data)
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

  const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        fetchWeather(`${latitude},${longitude}`)
      },
      function (error) {
        console.error('Geolocation error:', error)
        const randomCity = getRandomCity()
        setCity(randomCity)
        fetchWeather(randomCity)
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
    <div className='flex min-h-screen flex-col items-center md:p-24 p-6 text-indigo-800 lg:max-w-6xl lg:mx-auto'>
      <main className='card flex flex-col items-center w-full p-2 rounded-2xl mb-4'>
        <InputForm
          setCity={setCity}
          handleSearch={handleSearch}
          fetchWeather={fetchWeather}
        />
        <WeatherDisplay
          data={data}
          loading={loading}
          noDataAvailable={noDataAvailable}
        />
      </main>
      {data.location && (
        <Footer data={data} />
      )}
    </div>
  )
}
