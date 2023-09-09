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

export function WeatherChart ({ data, localTime }) {
  const [dataHours, setDataHours] = useState([])

  useEffect(() => {
    const tempData = data.map((hour) => hour.temp_c)
    setDataHours(tempData)
  }, [data])

  const isLocalHour = (context) => {
    const LocalHour = localTime.split(' ')[1].split(':')[0].padStart(2, '0')
    const localHourIndex = LABELS.indexOf(LocalHour + ':00')
    return context.dataIndex === localHourIndex
  }

  const data2 = {
    labels: LABELS,
    datasets: [
      {
        label: 'Temperature',
        borderColor: '#4338ca',
        data: dataHours,
        tension: 0.4,
        pointBackgroundColor: (context) => (isLocalHour(context) ? '#6366f1' : '#4338ca'),
        pointRadius: (context) => (isLocalHour(context) ? 5.5 : 2),
        pointHoverRadius: (context) => (isLocalHour(context) ? 6.5 : 3.5),
        pointHoverBackgroundColor: '#6366f1'
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 3,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { color: '#e7eff5' },
        ticks: { color: '#e7eff5' }
      },
      y: {
        grid: { color: '#e7eff5' },
        ticks: { color: '#e7eff5' }
      }
    }
  }

  return (
    <section className='max-h-80 w-full'>
      <Line data={data2} options={options} />
    </section>
  )
}
