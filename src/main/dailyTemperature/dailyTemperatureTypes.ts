export interface DailyTemperatureBaseNode {
  date: string;
  temperatureMax: number | null;
  temperatureMin: number | null;
}

export interface DailyTemperatureFilters {
  startDate?: string;
  endDate?: string;
}

export type DailyTemperatureDateRangeFilters = Pick<
  DailyTemperatureFilters,
  'endDate' | 'startDate'
>;
