import { NextRequest, NextResponse } from 'next/server';
import compact from 'lodash/compact';

import { processError } from '@/server/utils/exceptions/processError';
import { ResponseFormatter } from '@/server/utils/ResponseFormatter';
import { ParseIndexQuery } from '@/server/utils/ParseIndexQuery';
import { fetchWeatherApi } from '@/server/utils/fetchWeatherApi';
import { ServerException } from '@/server/utils/exceptions/ServerException';

const scope = 'dailyTemperature';
const hardFilters = {
  timezone: 'Asia/Jerusalem',
  latitude: 31.7683,
  longitude: 35.2137,
  daily: ['temperature_2m_max', 'temperature_2m_min'],
};

interface DailyTemperatureFilters {
  startDate: string;
  endDate: string;
}

export async function GET(request: NextRequest) {
  try {
    // TODO check auth and access

    const options = new ParseIndexQuery<DailyTemperatureFilters>(
      request,
    ).parse();

    const start_date = options.filters?.startDate;
    const end_date = options.filters?.endDate;

    if (!start_date || !end_date) {
      const fullMessages = compact([
        start_date ? null : 'Start date is required',
        end_date ? null : 'End date is required',
      ]);

      throw new ServerException(
        fullMessages.join(', '),
        'Validation',
        fullMessages,
      );
    }

    const response = await fetchWeatherApi({
      params: {
        start_date,
        end_date,
        ...hardFilters,
      },
    });

    const nodes = response.data.daily.time.map(
      (time: string, index: number) => ({
        date: time,
        temperatureMax: response.data.daily.temperature_2m_max[index],
        temperatureMin: response.data.daily.temperature_2m_min[index],
      }),
    );

    return NextResponse.json(ResponseFormatter.index({ scope, nodes }));
  } catch (error) {
    return processError({ error: error as Error });
  }
}
