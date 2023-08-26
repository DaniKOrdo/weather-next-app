import Image from 'next/image'

export function Weather ({ data }) {
  const { name, country } = data.location
  const { temp_c, feelslike_c, humidity, wind_kph } = data.current
  const { text } = data.current.condition

  console.log(data)

  return (
    <>
      <span>{name}, {country}</span>
      <p className='text-9xl font-bold text-violet-700'>{Math.round(temp_c)}&#176;</p>

      <div className='flex items-center'>
        <p className='uppercase text-violet-900'>{text}</p>
        <Image src={`https:${data.current.condition.icon}`} alt={text} height={64} width={64}/>
      </div>

      <section className='flex  gap-12 bg-slate-200 p-5 rounded-full'>
        <div className='flex flex-col items-center'>
          <span>{Math.round(feelslike_c)}</span>
          <span className='text-xs'>Feels like</span>
        </div>
        <div className='flex flex-col items-center'>
          <span>{humidity}</span>
          <span className='text-xs'>Humidity</span>
        </div>
        <div className='flex flex-col items-center'>
          <span>{Math.round(wind_kph)}</span>
          <span className='text-xs'>Wind speed</span>
        </div>
      </section>
    </>
  )
}
