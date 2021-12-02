import { useEffect, useRef } from 'react'
import { ECharts, init } from 'echarts'
import { numberWithCommas } from '@utils/helpers'
import type { PieData } from '@utils/types'

type Props = {
  data: PieData[];
  className?: string;
  percentage?: boolean;
}

export default function PieChart({ data, className, percentage }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  let chart: ECharts

  useEffect(() => {
    if (ref?.current && data?.length > 0) {
      chart = init(ref.current)
      const option = getPieOption(data, percentage)
      chart.setOption(option)
      window.addEventListener('resize', resizeChart)
    }

    return () => {
      chart.dispose()
      window.removeEventListener('resize', resizeChart)
    }
  }, [])

  const resizeChart = () => {
    chart?.resize()
  }

  return <div className={className || ''} ref={ref} />
}

function getPieOption(data: PieData[], percentage?: boolean) {
  return {
    textStyle: {
      fontFamily: 'Play'
    },
    title: {
      left: 'center',
      textStyle: {
        fontFamily: 'Play',
        color: 'rgba(0, 0, 0, 1)'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const { value, name, marker, percent } = params
        return percentage
          ? `${marker} ${name} <b style='margin-left: 15px;'>${percent}%</b>`
          : `${marker} ${name} <b style='margin-left: 15px;'>${numberWithCommas(value)}</b>`
      },
      textStyle: {
        fontFamily: 'Play',
        color: '#000',
        fontSize: 12
      }
    },
    label: {
      color: 'rgba(0, 0, 0, 1)',
      fontSize: 12
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: data,
        textStyle: {
          fontFamily: 'Play',
          color: 'rgba(0, 0, 0, 1)'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    avoidLabelOverlap: false
  }
}
