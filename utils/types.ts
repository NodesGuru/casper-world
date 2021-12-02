export type LineData = {
  date: number;
  count: number;
}

export type PieData = {
  name: string;
  value: number;
  percent?: string;
}

export type MapData = {
  latitude: number;
  longitude: number;
}

export type StatsData = {
  activeValidators: number;
  totalValidators: number;
  latestVersion: number;
  outdatedVersion: number;
  activeStake: number;
  inactiveStake: number;
}
