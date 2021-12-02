import type { PieData } from '@utils/types'
import { Constants } from '@utils/constants'

export function transformTimestampToDate(date: string | number): string {
  return new Date(date).toLocaleDateString('us-US')
}

export function numberWithCommas(x: string | number): string {
  return parseInt(x.toString())
    .toLocaleString('es')
    .replace(/\./g, ',')
}

function sortByName(a: PieData, b: PieData): number {
  return a.value > b.value ? -1 : a.value < b.value ? 1 : a.name.localeCompare(b.name)
}

// Combine small numbers in Hardware decentralization and Stake decentralization by country charts
export function combineOthers(array: PieData[]): PieData[] {
  const othersValue = array.sort(sortByName).reduce((acc, r, i) => {
    if (i >= Constants.DATA_LIMIT) {
      return acc + r.value
    }
    return acc
  }, 0)

  return calcPercent([...array.slice(0, Constants.DATA_LIMIT), { name: 'Others', value: othersValue }])
}

// Calculate percent and round it up to 100
export function calcPercent(array: PieData[]): PieData[] {
  const sum = array.reduce((acc, s) => acc + Number(s.value), 0)

  return array
    .map(el => ({ ...el, percent: (el.value / sum * 100).toFixed(2) }))
    .map((el, i, arr) => {
      if (arr.length - 1 === i) {
        const percentSum = arr.slice(0, -1).reduce((acc, s) => acc + Number(s.percent), 0)
        return { ...el, percent: (100 - percentSum).toFixed(2) }
      }
      return el
    })
}
