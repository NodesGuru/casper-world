import { useEffect, useRef } from 'react'
import { ECharts, EChartsOption, init } from 'echarts'
import { transformTimestampToDate } from '@utils/helpers'
import type { LineData } from '@utils/types'

type Props = {
  title: string;
  data: LineData[];
  className?: string;
  offset?: number;
}

export default function LineChart({ title, data, className, ...options }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  let chart: ECharts

  useEffect(() => {
    if (ref?.current && data?.length > 0) {
      chart = init(ref.current)
      const option = getLineOption(data, options?.offset)
      option && chart.setOption(option)
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

  return (
    <>
      <div className={className || ''}>
        <h6>{title}</h6>
        <div ref={ref} />
      </div>

      <style jsx>{`
        h6 {
          font-size: 26px;
          font-weight: 700;
        }

        div {
          position: relative;

          > div {
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
    </>
  )
}

function getLineOption(data: LineData[], offset = 0): EChartsOption {
  const min = Math.floor(Math.min(...data.map(i => i.count)) / 100) * 100 - offset
  const max = Math.ceil(Math.max(...data.map(i => i.count)) / 100) * 100
  const dateList = data.map(item => transformTimestampToDate(item.date))
  const valueList = data.map(item => item.count)

  return {
    textStyle: {
      fontFamily: 'Play'
    },
    title: {
      left: 'center',
      textStyle: {
        color: 'black'
      }
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontFamily: 'Play',
        color: '#000',
        fontSize: 12
      }
    },
    xAxis: {
      type: 'category',
      data: dateList,
      axisLabel: {
        color: 'rgba(0, 0, 0, 1)',
        fontFamily: 'Play'
      }
    },
    yAxis: {
      type: 'value',
      scale: true,
      interval: (max - min) / 4,
      min,
      max,
      axisLabel: {
        color: 'rgba(0, 0, 0, 1)',
        fontFamily: 'Play'
      }
    },
    dataZoom: {
      type: 'inside',
      zoomLock: false
    },
    series: [{
      type: 'line',
      showSymbol: true,
      smooth: true,
      data: valueList
    }],
    grid: {
      left: '4%',
      top: 30,
      bottom: 30,
      containLabel: true
    }
  }
}
