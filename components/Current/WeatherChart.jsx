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

  console.log(dataHours)

  const data2 = {
    labels: LABELS,
    datasets: [
      {
        label: 'Temperature',
        backgroundColor: '#EAC435',
        borderColor: 'rgba(234, 196, 53,0.5)',
        data: dataHours
      }
    ]
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 3,
    scales: {
      x: {
        ticks: {
          color: 'gray'
        }
      },
      y: {
        ticks: {
          color: 'gray'
        }
      }
    }
  }

  return (
    <section className='max-h-80 w-full'>
      <Line data={data2} options={options} />
    </section>
  )
}
