import Image from 'next/image'
import thermometerIcon from '@/components/icons/thermometerIcon.svg'
import humidityIcon from '@/components/icons/humidityIcon.svg'
import windIcon from '@/components/icons/windIcon.svg'

export function InfoSection ({ data }) {
  const {
    feelslike_c: feelslikeC,
    humidity,
    wind_kph: windKph
  } = data.current

  return (
    <section className='flex md:gap-12 gap-4 bg-indigo-50 p-4 px-8 m-4 rounded-full text-center'>
      <div className='flex flex-col items-center'>
        <Image
          src={thermometerIcon}
          height={18}
          width={18}
          alt='search icon'
        />
        <span className='font-medium'>{Math.round(feelslikeC)}&#176;</span>
        <span className='text-xs'>Feels like</span>
      </div>
      <div className='flex flex-col items-center'>
        <Image
          src={humidityIcon}
          height={18}
          width={18}
          alt='search icon'
        />
        <span className='font-medium'>{humidity}<span className='text-xs'>%</span></span>
        <span className='text-xs'>Humidity</span>
      </div>
      <div className='flex flex-col items-center'>
        <Image
          src={windIcon}
          height={18}
          width={18}
          alt='search icon'
        />
        <span className='font-medium'>{Math.round(windKph)} <span className='text-xs'>km/h</span></span>
        <span className='text-xs'>Wind speed</span>
      </div>
    </section>
  )
}
