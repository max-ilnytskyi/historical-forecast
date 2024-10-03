'use client';
import React, { useState, useCallback } from 'react';
import pick from 'lodash/pick';

import {
  DailyTemperatureFilters,
  DailyTemperatureDateRangeFilters,
} from '@/main/dailyTemperature/dailyTemperatureTypes';

import { useDailyTemperature } from '@/main/dailyTemperature/hooks/useDailyTemperature';

import { DailyTemperatureChartBlock } from '@/main/dailyTemperature/components/blocks/DailyTemperatureChartBlock';

import { DailyTemperaturesDateRangeStorage } from '@/main/dailyTemperature/utils/DailyTemperaturesDateRangeStorage';
import { getMonthRange } from '@/common/utils/getMonthRange';

export function HomePage() {
  const [initialFilters] = useState<DailyTemperatureFilters>(() => {
    if (typeof window === 'undefined') {
      return {};
    }
    const storedDateRange = DailyTemperaturesDateRangeStorage.getItem();
    return storedDateRange || getMonthRange();
  });

  const {
    dailyTemperature,
    dailyTemperatureLoading,
    dailyTemperatureErrorMessage,
    dailyTemperaturePlaceholderData,
    dailyTemperatureFilters,
    filterDailyTemperature,
  } = useDailyTemperature({ initialFilters });

  const handleChangeFilters = useCallback<
    (filters: DailyTemperatureFilters) => void
  >(
    (filters) => {
      const dateRangeFilters: DailyTemperatureDateRangeFilters = pick(
        filters,
        'endDate',
        'startDate',
      );

      DailyTemperaturesDateRangeStorage.setItem(dateRangeFilters);

      filterDailyTemperature(filters);
    },
    [filterDailyTemperature],
  );

  return (
    <DailyTemperatureChartBlock
      dailyTemperature={dailyTemperature}
      dailyTemperatureLoading={dailyTemperatureLoading}
      dailyTemperatureErrorMessage={dailyTemperatureErrorMessage}
      dailyTemperaturePlaceholderData={dailyTemperaturePlaceholderData}
      dailyTemperatureFilters={dailyTemperatureFilters}
      filterDailyTemperature={handleChangeFilters}
    />
  );
}
