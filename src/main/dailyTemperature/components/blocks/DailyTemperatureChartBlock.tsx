'use client';

import {
  DailyTemperatureBaseNode,
  DailyTemperatureFilters,
} from '@/main/dailyTemperature/dailyTemperatureTypes';
import { strings } from '@/texts';

interface DailyTemperatureChartBlockProps {
  dailyTemperature: DailyTemperatureBaseNode[];
  dailyTemperatureLoading: boolean;
  dailyTemperatureErrorMessage: string | null;
  dailyTemperatureFilters: DailyTemperatureFilters;
  filterDailyTemperature: (filters: DailyTemperatureFilters) => void;
}

export function DailyTemperatureChartBlock({
  dailyTemperature,
  dailyTemperatureLoading,
  dailyTemperatureErrorMessage,
  dailyTemperatureFilters,
  filterDailyTemperature,
}: DailyTemperatureChartBlockProps) {
  console.log('===dailyTemperature: ', dailyTemperature); // temp
  return (
    <div className="">
      <h1 className="text-4xl font-bold mb-4 text-center">
        {strings.temperatureInJerusalemC}
      </h1>
    </div>
  );
}
