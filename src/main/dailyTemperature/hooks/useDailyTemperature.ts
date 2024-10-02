import { useCallback, useState, useMemo } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { FetchIndexQueryBaseParams } from '@/types';
import {
  DailyTemperatureBaseNode,
  DailyTemperatureFilters,
} from '@/main/dailyTemperature/dailyTemperatureTypes';

import parseRequestError from '@/common/utils/parseRequestError/parseRequestError';

import { baseGetAction } from '@/common/actions/baseGetAction';

import { DailyTemperatureCacheKey } from '@/main/dailyTemperature/DailyTemperatureCacheKey';
import { DailyTemperatureApiPath } from '@/main/dailyTemperature/DailyTemperatureApiPath';

interface DailyTemperatureResponse {
  dailyTemperature: {
    nodes: DailyTemperatureBaseNode[];
  };
}

const itemsKey = 'dailyTemperature';
const cacheKey = DailyTemperatureCacheKey.index();

interface DailyTemperatureOptions {
  initialFilters?: DailyTemperatureFilters;
}

export function useDailyTemperature({
  initialFilters,
}: DailyTemperatureOptions) {
  const [filters, setFilters] = useState<DailyTemperatureFilters>(
    initialFilters || {},
  );

  const params = useMemo(
    () =>
      ({
        filters,
      }) as FetchIndexQueryBaseParams,
    [filters],
  );

  const queryFn = useCallback<
    () => Promise<DailyTemperatureResponse>
  >(async () => {
    return baseGetAction<DailyTemperatureResponse>({
      path: DailyTemperatureApiPath.index(),
      params,
    });
  }, [params]);

  const { data, isLoading, error, isPlaceholderData } =
    useQuery<DailyTemperatureResponse>({
      queryKey: [cacheKey, params],
      queryFn,
      placeholderData: keepPreviousData,
    });

  const nodes = data?.[itemsKey]?.nodes || [];

  return {
    dailyTemperature: nodes,
    dailyTemperatureError: error,
    dailyTemperatureErrorMessage: parseRequestError(error),
    dailyTemperatureLoading: isLoading,
    dailyTemperaturePlaceholderData: isPlaceholderData,
    dailyTemperatureFilters: filters,
    filterDailyTemperature: setFilters,
  };
}
