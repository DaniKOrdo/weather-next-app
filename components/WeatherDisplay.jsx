import Image from 'next/image'
import { Weather } from '@/components/Current/Weather'
import { WeatherChart } from '@/components/Current/WeatherChart'
import sadCloud from '@/components/icons/sadCloud.svg'

export default function WeatherDisplay ({ data, loading, noDataAvailable }) {
  return (
    <>
      {!data.current && loading && <p className='text-2xl'>Loading...</p>}
      {data.current && <Weather data={data} />}
      {!data.error && noDataAvailable && !loading && (
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
          />
          <p className='text-2xl'>{data.error.message}</p>
        </section>
      )}
    </>
  )
}
