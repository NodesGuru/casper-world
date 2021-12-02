import type { PieData } from '@utils/types'

type Props = {
  data: PieData[];
  className?: string;
  withValue?: boolean;
}

export function Table({ data, className, withValue }: Props) {
  return (
    <table className={className || ''}>
      <tbody>
      {
        data.map(r => (
          <tr key={r.name}>
            <td>{r.name}</td>
            {withValue && <td>{r.value}</td>}
            <td>{r.percent + '%'}</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  )
}
