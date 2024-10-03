import { SyncStorage } from '@/common/utils/SyncStorage';
import { DailyTemperatureDateRangeFilters } from '@/main/dailyTemperature/dailyTemperatureTypes';

const key = 'dailyTemperaturesDateRange';

export class DailyTemperaturesDateRangeStorage {
  static setItem(value: DailyTemperatureDateRangeFilters): void {
    SyncStorage.setItem(key, value);
  }

  static getItem(): DailyTemperatureDateRangeFilters | null {
    return SyncStorage.getItem(key);
  }

  static removeItem(): void {
    SyncStorage.removeItem(key);
  }
}
