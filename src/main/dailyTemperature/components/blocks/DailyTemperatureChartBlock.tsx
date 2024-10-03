'use client';

import {
  DailyTemperatureBaseNode,
  DailyTemperatureFilters,
} from '@/main/dailyTemperature/dailyTemperatureTypes';

import { DailyTemperatureChart } from '@/main/dailyTemperature/components/charts/DailyTemperatureChart';
import {
  DateRangePicker,
  DateRangePickerValue,
  DateRangePickerOnChange,
} from '@/common/helpers/DateRangePicker';
import { Loading } from '@/common/helpers/Loading';
import { AlertMessage } from '@/common/helpers/AlertMessage';

import { strings } from '@/texts';
import { reduceArray } from '@/common/utils/reduceArray';

const MAX_DATE = new Date();
const MIN_DATE = new Date('2021-03-24'); // Data is unavailable until this time.
const BASE_NODES_AMOUNT = 50;

interface DailyTemperatureChartBlockProps {
  dailyTemperature: DailyTemperatureBaseNode[];
  dailyTemperatureLoading: boolean;
  dailyTemperatureErrorMessage: string | null;
  dailyTemperaturePlaceholderData: boolean;
  dailyTemperatureFilters: DailyTemperatureFilters;
  filterDailyTemperature: (filters: DailyTemperatureFilters) => void;
}

export function DailyTemperatureChartBlock({
  dailyTemperature,
  dailyTemperatureLoading,
  dailyTemperatureErrorMessage,
  dailyTemperaturePlaceholderData,
  dailyTemperatureFilters,
  filterDailyTemperature,
}: DailyTemperatureChartBlockProps) {
  const dateRangePickerValue: DateRangePickerValue = {
    startDate: dailyTemperatureFilters?.startDate,
    endDate: dailyTemperatureFilters?.endDate,
  };
  const handleDateRangePickerChange: DateRangePickerOnChange = (value) => {
    filterDailyTemperature({ ...dailyTemperatureFilters, ...value });
  };

  const reducedDailyTemperature = reduceArray(
    dailyTemperature,
    BASE_NODES_AMOUNT,
  );

  return (
    <div className="h-screen  flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-center">
        {strings.temperatureInJerusalemC}
      </h1>
      <div className="w-full max-w-4xl flex flex-col items-center space-y-2 md:space-y-4">
        <div className="w-full max-w-full flex justify-center items-center">
          <div className="w-full overflow-x-auto overflow-y-hidden">
            <div className="flex justify-center min-w-[800px] h-[400px] flex justify-center relative">
              <Loading
                className="bg-gray-500 bg-opacity-10 absolute inset-0 flex items-center justify-center text-gray-400'"
                loaded={
                  !dailyTemperatureLoading && !dailyTemperaturePlaceholderData
                }
              />
              <DailyTemperatureChart
                dailyTemperature={reducedDailyTemperature}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2 md:mt-4">
          <div className="w-full">
            <DateRangePicker
              value={dateRangePickerValue}
              maxDate={MAX_DATE}
              minDate={MIN_DATE}
              onChange={handleDateRangePickerChange}
            />
          </div>
        </div>
        <AlertMessage message={dailyTemperatureErrorMessage} />
      </div>
    </div>
  );
}
