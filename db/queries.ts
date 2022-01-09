import { Validator } from './models/validator'
import { Constants } from '@utils/constants'
import { combineOthers, calcPercent } from '@utils/helpers'
import type { LineData, MapData, PieData, StatsData } from '@utils/types'

export async function getVps(): Promise<PieData[]> {
  const result = await Validator.aggregate([
    {
      $group: {
        _id: '$timestamp',
        vps: { $push: '$vps' }
      }
    },
    { $sort: { _id: -1 } },
    { $limit: 1 },
    { $unwind: '$vps' },
    { $match: { vps: { $ne: null } } },
    {
      $group: {
        _id: '$vps',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        value: '$count'
      }
    },
    { $sort: { value: -1 } }
  ])

  return result?.length > 0 ? combineOthers(result) : []
}

export async function getVersions(): Promise<PieData[]> {
  const HIDDEN_VERSION = 'Hidden'

  const result = await Validator.aggregate([
    {
      $group: {
        _id: '$timestamp',
        version: { $push: '$version' }
      }
    },
    { $sort: { _id: -1 } },
    { $limit: 1 },
    { $unwind: '$version' },
    {
      $group: {
        _id: '$version',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        name: { $ifNull: ['$_id', HIDDEN_VERSION] },
        value: '$count'
      }
    },
    { $sort: { value: -1 } }
  ])

  return calcPercent([...result.filter(v => v.name !== HIDDEN_VERSION), ...result.filter(v => v.name === HIDDEN_VERSION)])
}

async function getLatestVersion(): Promise<string> {
  const lastRecord = await Validator.aggregate([
    { $match: { version: { $ne: null } } },
    {
      $group: {
        _id: '$timestamp',
        versions: { $addToSet: '$version' }
      }
    },
    { $sort: { _id: -1 } },
    { $limit: 1 },
    {
      $project: {
        version: { $max: '$versions' }
      }
    }
  ])

  return lastRecord[0]?.version
}

export async function getCountries(): Promise<PieData[]> {
  const latestRecord = await Validator.findOne({}).sort({ timestamp: -1 }).limit(1)

  const result = await Validator.aggregate([
    { $match: { timestamp: latestRecord?.timestamp } },
    { $match: { country: { $ne: null } } },
    {
      $group: {
        _id: '$country',
        stake: { $sum: { $toLong: '$current_stake' } }
      }
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        value: { $trunc: [{ $divide: ['$stake', Constants.DECIMALS] }] }
      }
    },
    { $sort: { value: -1 } }
  ])

  return result?.length > 0 ? combineOthers(result) : []
}

export async function getTotalStakeByDays(): Promise<LineData[]> {
  return Validator.aggregate([
    { $match: { current_stake: { $ne: null } } },
    {
      $group: {
        _id: { $toDate: '$timestamp' },
        count: { $sum: { $toLong: '$current_stake' } }
      }
    },
    { $sort: { _id: 1 } },
    {
      $group: {
        _id: { $substr: ['$_id', 0, 10] },
        count: { $last: '$count' }
      }
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        count: { $trunc: [{ $divide: ['$count', Constants.DECIMALS] }, 0] }
      }
    },
    { $sort: { date: 1 } }
  ])
}

export async function getTotalDelegatorsByDays(): Promise<LineData[]> {
  const lastRecordsByDay = await Validator.aggregate([
    { $match: { current_stake: { $ne: null } } },
    {
      $group: {
        _id: { $substr: [{ $toDate: '$timestamp' }, 0, 10] },
        date: { $max: '$timestamp' }
      }
    }
  ])

  const timestamps = lastRecordsByDay.map(r => r.date)
  return Validator.aggregate([
    { $match: { timestamp: { $in: timestamps } } },
    { $match: { current_stake: { $ne: null } } },
    { $unwind: '$delegators' },
    {
      $group: {
        _id: { $toDate: '$timestamp' },
        delegators: { $addToSet: '$delegators.public_key' }
      }
    },
    {
      $project: {
        _id: 0,
        date: { $substr: ['$_id', 0, 10] },
        count: { $size: '$delegators' }
      }
    },
    { $sort: { date: 1 } }
  ]).allowDiskUse(true)
}

export async function getCoordinates(): Promise<MapData[]> {
  const result = await Validator.aggregate([
    {
      $group: {
        _id: '$timestamp',
        coords: { $push: { latitude: '$latitude', longitude: '$longitude' } }
      }
    },
    { $sort: { _id: -1 } },
    { $limit: 1 },
    {
      $project: {
        _id: 0,
        coords: {
          $filter: {
            input: '$coords',
            as: 'coord',
            cond: {
              $and: [
                { $ne: ['$$coord.latitude', null] },
                { $ne: ['$$coord.longitude', null] }
              ]
            }
          }
        }
      }
    }
  ])

  return result[0]?.coords || []
}

export async function getValidatorsStats(): Promise<StatsData> {
  const latestVersion = await getLatestVersion()
  const result = await Validator.aggregate([
    {
      $group: {
        _id: '$timestamp',
        totalValidators: { $sum: 1 },
        activeValidators: { $sum: { $toInt: { $ne: ['$current_stake', null] } } },
        outdatedVersion: {
          $sum: {
            $toInt: { $ne: ['$version', latestVersion] }
          }
        },
        latestVersion: { $sum: { $toInt: { $eq: ['$version', latestVersion] } } },
        activeStake: {
          $sum: {
            $cond: {
              if: { $ne: ['$current_stake', null] },
              then: { $toLong: '$current_stake' },
              else: 0
            }
          }
        },
        inactiveStake: {
          $sum: {
            $cond: {
              if: { $eq: ['$inactive', true] },
              then: { $toLong: '$total_stake' },
              else: 0
            }
          }
        }
      }
    },
    { $sort: { _id: -1 } },
    { $limit: 1 },
    {
      $project: {
        _id: 0,
        totalValidators: 1,
        activeValidators: 1,
        outdatedVersion: 1,
        latestVersion: 1,
        activeStake: { $trunc: [{ $divide: ['$activeStake', Constants.DECIMALS] }] },
        inactiveStake: { $trunc: [{ $divide: ['$inactiveStake', Constants.DECIMALS] }] }
      }
    }
  ])

  return result[0] || null
}

export async function getStakeDecentralization(): Promise<PieData[]> {
  const result = await Validator.aggregate([
    { $match: { current_stake: { $ne: null } } },
    {
      $group: {
        _id: '$timestamp',
        validators: {
          $push: {
            validator: '$public_key',
            total_stake: { $toLong: '$current_stake' }
          }
        }
      }
    },
    { $sort: { _id: -1 } },
    { $limit: 1 },
    { $unwind: '$validators' },
    { $sort: { 'validators.total_stake': -1 } },
    {
      $group: {
        _id: '$timestamp',
        validators: { $push: '$validators' }
      }
    },
    {
      $project: {
        top: [
          { name: 'Top 10', value: { $slice: ['$validators', 10] } },
          { name: 'Top 11-50', value: { $slice: ['$validators', 10, 40] } },
          { name: 'Rest', value: { $slice: ['$validators', 50, { $size: '$validators' }] } }
        ]
      }
    },
    { $unwind: '$top' },
    {
      $group: {
        _id: '$top.name',
        value: { $first: '$top.value.total_stake' }
      }
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        value: { $trunc: [{ $divide: [{ $sum: '$value' }, Constants.DECIMALS] }] }
      }
    },
    { $sort: { value: -1 } }
  ])

  return calcPercent(result)
}
