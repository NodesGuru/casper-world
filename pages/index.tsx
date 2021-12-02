import Link from 'next/link'
import PieChart from '@components/charts/PieChart'
import DecentralizationMap from '@components/maps/DecentralizationMap'
import { Table } from '@components/table/Table'
import LineChart from '@components/charts/LineChart'
import { numberWithCommas } from '@utils/helpers'
import {
  getCoordinates,
  getCountries,
  getStakeDecentralization,
  getTotalDelegatorsByDays,
  getTotalStakeByDays,
  getValidatorsStats,
  getVersions,
  getVps
} from '../db/queries'
import type { LineData, MapData, PieData, StatsData } from '@utils/types'

type Props = {
  totalStake: LineData[];
  totalDelegators: LineData[];
  coords: MapData[];
  stakeDecentralization: PieData[];
  countries: PieData[];
  vps: PieData[];
  versions: PieData[];
  stats: StatsData;
}

export default function HomePage(props: Props) {
  const { totalStake, totalDelegators, coords, stakeDecentralization, countries, vps, versions, stats } = props

  return (
    <>
      <section className='world'>
        <div className='world__header'>
          <h1>Casper World</h1>
          <Link href='https://nodes.guru/casper' passHref={true}>
            <a className='world__back'>Back to project</a>
          </Link>
        </div>

        <div className='world__total'>
          {totalDelegators?.length > 0 &&
          <LineChart title='Total Delegators' data={totalDelegators} className='world__total-chart' />}
          {totalStake?.length > 0 &&
          <LineChart title='Total Stake' data={totalStake} offset={150_000_000} className='world__total-chart' />}
        </div>

        {
          coords?.length > 0 &&
          <>
            <h2 className='world__subtitle'>Casper World Map</h2>
            <div className='world__map'>
              <DecentralizationMap data={coords} />
            </div>
          </>
        }

        {
          stakeDecentralization?.length > 0 &&
          <>
            <h2 className='world__subtitle'>Stake Decentralization by Validators</h2>
            <div className='world__item'>
              <PieChart data={stakeDecentralization} className='world__item-chart' />
              <Table data={stakeDecentralization} className='world__table' />
            </div>
          </>
        }

        {
          countries?.length > 0 &&
          <>
            <h2 className='world__subtitle'>Stake Decentralization by Country</h2>
            <div className='world__item'>
              <PieChart data={countries} className='world__item-chart' percentage={true} />
              <Table data={countries} className='world__table' />
            </div>
          </>
        }

        {
          vps?.length > 0 &&
          <>
            <h2 className='world__subtitle'>Hardware Decentralization</h2>
            <div className='world__item'>
              <PieChart data={vps} className='world__item-chart' percentage={true} />
              <Table data={vps} className='world__table' />
            </div>
          </>
        }

        {
          versions?.length > 0 &&
          <>
            <h2 className='world__subtitle'>Nodes Version Distribution</h2>
            <div className='world__item'>
              <PieChart data={versions} className='world__item-chart' />
              <Table data={versions} className='world__table' withValue={true} />
            </div>
          </>
        }

        {
          stats &&
          <>
            <h2 className='world__subtitle'>Validators Stats</h2>
            <div className='world__stats'>
              <div>
                <div className='world__stats-item'>
                  <b>Latest Version</b>
                  <span className='green'>{stats.latestVersion}</span>
                </div>

                <div className='world__stats-item'>
                  <b>Outdated / Hidden</b>
                  <span>{stats.outdatedVersion}</span>
                </div>
              </div>
              <div>
                <div className='world__stats-item'>
                  <b>Total</b>
                  <span>{stats.totalValidators}</span>
                </div>

                <div className='world__stats-item'>
                  <b>Active</b>
                  <span className='green'>{stats.activeValidators}</span>
                </div>
              </div>
            </div>

            <div className='world__stats'>
              <div>
                <div className='world__stats-item world__stats-stake'>
                  <b>Active stake</b>
                  <span className='green'>{numberWithCommas(stats.activeStake)}</span>
                </div>

                <div className='world__stats-item world__stats-stake'>
                  <b>Inactive stake</b>
                  <span className='red'>{numberWithCommas(stats.inactiveStake)}</span>
                </div>
              </div>
            </div>
          </>
        }
      </section>

      <style global jsx>{`
        .world {
          background-color: $white-color;
          padding: 2rem;
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        }

        .world__header {
          position: relative;

          h1 {
            font-size: 40px;
            font-weight: 700;
            text-align: center;
          }
        }

        .world__subtitle {
          font-size: 36px;
          text-align: center;
          width: 400px;
          margin: 60px auto 40px;
        }

        .world__back {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 18px;
          color: $orange-color;
          cursor: pointer;

          &:hover {
            color: $orange-color;
          }
        }

        .world__total {
          display: flex;
          justify-content: space-around;
          margin-top: 60px;

          &-chart {
            width: 400px;
            height: 180px;
            text-align: center;
          }
        }

        .world__map {
          width: 100%;
          height: 400px;
        }

        .world__table {
          max-width: 500px;
          width: 100%;
          font-size: 24px;

          td {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 250px;
          }

          td:last-child {
            text-align: right;
          }
        }

        .world__item {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: -45px;
          margin-bottom: -45px;

          &-chart {
            width: 400px;
            height: 400px;
          }
        }

        .world__stats {
          padding: 0 150px;
          display: flex;
          justify-content: space-between;

          &-item {
            width: 360px;
            display: flex;
            justify-content: space-between;
            font-size: 28px;

            & + & {
              margin-top: 15px;
            }

            span {
              font-weight: 700;

              &.green {
                color: #13FB1C;
              }

              &.red {
                color: #E41A1C;
              }
            }
          }

          &-stake {
            width: 410px;
          }

          &:last-child {
            justify-content: left;
            margin-top: 50px;
          }
        }

        @media screen and (max-width: 1100px) {
          .world__stats {
            padding: 0;
          }
        }

        @media screen and (max-width: 1000px) {
          .world__item {
            flex-direction: column;
          }

          .world__total {
            flex-direction: column;
            align-items: center;

            &-chart + &-chart {
              margin-top: 35px;
            }
          }

          .world__table {
            margin-bottom: 40px;
          }
        }

        @media screen and (max-width: 800px) {
          .world__back {
            top: -10px !important;
          }

          .world__header {
            h1 {
              padding-top: 25px;
            }
          }

          .world__stats {
            flex-direction: column;

            > div + div {
              margin-top: 50px;
            }
          }
        }

        @media screen and (max-width: 600px) {
          .world {
            padding: 1rem;
          }

          .world__header {
            h1 {
              font-size: 34px;
            }
          }

          .world__subtitle {
            font-size: 30px;
            width: auto;
          }

          .world__total {
            &-chart {
              width: 100%;
            }
          }

          .world__item {
            &-chart {
              width: 100%;
              height: 300px;
            }

            div:last-child {
              width: 100%;
            }
          }

          .world__table {
            font-size: 20px;
            min-width: 100%;

            td {
              padding: 0 15px;
              max-width: 150px;
            }
          }

          .world__stats {
            &-item {
              font-size: 22px;
              width: 100%;
            }
          }
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps() {
  const [totalStake, totalDelegators, coords, stakeDecentralization, countries, vps, versions, stats] =
    await Promise.all([
      getTotalStakeByDays(),
      getTotalDelegatorsByDays(),
      getCoordinates(),
      getStakeDecentralization(),
      getCountries(),
      getVps(),
      getVersions(),
      getValidatorsStats()
    ])

  if (!totalStake.length && !totalDelegators.length && !coords.length && !stakeDecentralization.length
    && !countries.length && !vps.length && !versions.length && !stats) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      totalStake,
      totalDelegators,
      coords,
      stakeDecentralization,
      countries,
      vps,
      versions,
      stats
    }
  }
}

