export function Weather ({ data }) {
  const { name } = data
  const { temp, feels_like, humidity } = data.main
  const { description } = data.weather[0]
  const { speed } = data.wind

  /*
  {
    coord: { lon: 2.6502, lat: 39.5694 },
    weather: [ { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' } ],
    base: 'stations',
    main: {
      temp: 30.91,
      feels_like: 33.28,
      temp_min: 28.94,
      temp_max: 33.08,
      pressure: 1010,
      humidity: 54
    },
    visibility: 10000,
    wind: { speed: 4.12, deg: 220 },
    clouds: { all: 0 },
    dt: 1692984004,
    sys: {
      type: 2,
      id: 2001128,
      country: 'ES',
      sunrise: 1692940252,
      sunset: 1692988367
    },
    timezone: 7200,
    id: 2512989,
    name: 'Palma de Mallorca',
    cod: 200
  }
  */

  return (
    <>
      <span>{name}</span>
      <p className='text-9xl'>{Math.round(temp)}&#176;</p>
      <p className='uppercase'>{description}</p>

      <secction className='flex  gap-12 bg-slate-200 p-5 rounded-full'>
        <div className='flex flex-col items-center'>
          <span>{Math.round(feels_like)}</span>
          <span className='text-xs'>Feels like</span>
        </div>
        <div className='flex flex-col items-center'>
          <span>{humidity}</span>
          <span className='text-xs'>Humidity</span>
        </div>
        <div className='flex flex-col items-center'>
          <span>{Math.round(speed)}</span>
          <span className='text-xs'>Wind speed</span>
        </div>
      </secction>
    </>
  )
}
