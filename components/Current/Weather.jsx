export function Weather ({ data }) {
  const { name } = data.location
  const { temp_c, feelslike_c, humidity, wind_kph } = data.current
  const { text } = data.current.condition

  console.log(data)


  return (
    <>
      <span>{name}</span>
      <p className='text-9xl'>{Math.round(temp_c)}&#176;</p>
      <p className='uppercase'>{text}</p>

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
