import { useEffect, useState } from 'react'
import { LABELS } from '../Const.js'
import { Line } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export function WeatherChart ({ data }) {
  const [dataHours, setDataHours] = useState([])

  useEffect(() => {
    data.map((hour) => {
      setDataHours((prev) => [
        ...prev,
        hour.temp_c]
      )
    })
  }, [data])

  const isCurrentHour = (context) => {
    const currentHour = new Date().getHours().toString().padStart(2, '0')
    const currentTimeIndex = LABELS.indexOf(currentHour + ':00')
    return context.dataIndex === currentTimeIndex
  }

  const data2 = {
    labels: LABELS,
    datasets: [
      {
        label: 'Temperature',
        borderColor: '#4338ca',
        data: dataHours,
        tension: 0.4,
        pointBackgroundColor: (context) => (isCurrentHour(context) ? '#818cf8' : '#4338ca'),
        pointRadius: (context) => (isCurrentHour(context) ? 6 : 2)
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 3
  }

  return (
    <section className='max-h-80 w-full'>
      <Line data={data2} options={options} />
    </section>
  )
}
