import Image from 'next/image'

export function Weather ({ data }) {
  const { name, country } = data.location
  const { temp_c: tempC, feelslike_c: feelslikeC, humidity, wind_kph: windKph } = data.current
  const { text } = data.current.condition

  console.log(data)

  return (
    <>
      <span>{name}, {country}</span>
      <p className='text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-500'>{Math.round(tempC)}&#176;</p>

      <div className='flex items-center'>
        <p className='uppercase text-indigo-900'>{text}</p>
        <Image src={`https:${data.current.condition.icon}`} alt={text} height={64} width={64} />
      </div>

      <section className='flex  gap-12 bg-indigo-50 p-5 rounded-full'>
        <div className='flex flex-col items-center'>
          <span>{Math.round(feelslikeC)}</span>
          <span className='text-xs'>Feels like</span>
        </div>
        <div className='flex flex-col items-center'>
          <span>{humidity}</span>
          <span className='text-xs'>Humidity</span>
        </div>
        <div className='flex flex-col items-center'>
          <span>{Math.round(windKph)}</span>
          <span className='text-xs'>Wind speed</span>
        </div>
      </section>
    </>
  )
}
