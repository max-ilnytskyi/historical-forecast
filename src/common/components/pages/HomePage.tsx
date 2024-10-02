'use client';
import React from 'react';

import { useDailyTemperature } from '@/main/dailyTemperature/hooks/useDailyTemperature';

import { DailyTemperatureChartBlock } from '@/main/dailyTemperature/components/blocks/DailyTemperatureChartBlock';
import { getMonthRange } from '@/common/utils/getMonthRange';

export function HomePage() {
  const initialFilters = getMonthRange();

  const {
    dailyTemperature,
    dailyTemperatureLoading,
    dailyTemperatureErrorMessage,
    dailyTemperaturePlaceholderData,
    dailyTemperatureFilters,
    filterDailyTemperature,
  } = useDailyTemperature({ initialFilters });

  return (
    <DailyTemperatureChartBlock
      dailyTemperature={dailyTemperature}
      dailyTemperatureLoading={dailyTemperatureLoading}
      dailyTemperatureErrorMessage={dailyTemperatureErrorMessage}
      dailyTemperaturePlaceholderData={dailyTemperaturePlaceholderData}
      dailyTemperatureFilters={dailyTemperatureFilters}
      filterDailyTemperature={filterDailyTemperature}
    />
  );
}
