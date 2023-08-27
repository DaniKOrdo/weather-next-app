import Image from 'next/image'
import pointerMapIcon from '@/components/icons/pointerMapIcon.svg'
import thermometerIcon from '@/components/icons/thermometerIcon.svg'
import humidityIcon from '@/components/icons/humidityIcon.svg'
import windIcon from '@/components/icons/windIcon.svg'
import { WEATHER_CODES } from '@/components/Const.js'

export function Weather ({ data }) {
  const { name, country } = data.location
  const {
    temp_c: tempC,
    feelslike_c: feelslikeC,
    humidity,
    wind_kph: windKph
  } = data.current
  const { text } = data.current.condition

  function getWeatherIcon (code) {
    if (data.current && data.current.condition) {
      const isNight = data.current.is_day === 0
      const iconName = isNight ? (WEATHER_CODES[code]?.[1] || 'default-night') : (WEATHER_CODES[code]?.[0] || 'default-day')

      console.log(iconName)
      return `/weather/${iconName}.svg`
    }
    return ''
  }

  console.log(data)

  return (
    <>
      <span className='flex gap-1'>
        <Image
          src={pointerMapIcon}
          height={16}
          width={16}
          alt='pointer map icon'
        />
        {name}, {country}
      </span>
      <p className='text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-500'>
        {Math.round(tempC)}&#176;
      </p>

      <div className='flex items-center text-center relative'>
        <p className='text-indigo-900 font-medium'>{text}</p>
        <div className='absolute -top-32 -right-32 opacity-95'>
          <Image
            src={getWeatherIcon(data.current.condition.code)}
            alt={text}
            height={165}
            width={165}
          />
        </div>
      </div>

      <section className='flex gap-12 bg-indigo-50 p-5 px-8 m-3 rounded-full text-center'>
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
    </>
  )
}
