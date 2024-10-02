import React, { useCallback, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import min from 'lodash/min';
import compact from 'lodash/compact';

import { words } from '@/texts';

export interface DateRangePickerValue {
  startDate?: string;
  endDate?: string;
}
export type DateRangePickerOnChange = (value: DateRangePickerValue) => void;

interface DateRangePickerProps {
  value: DateRangePickerValue;
  maxDate?: Date;
  minDate?: Date;
  onChange: DateRangePickerOnChange;
}

export const DateRangePicker = ({
  value,
  maxDate,
  minDate,
  onChange,
}: DateRangePickerProps) => {
  const startDate = useMemo(
    () => (value.startDate ? new Date(value.startDate) : undefined),
    [value.startDate],
  );
  const endDate = useMemo(
    () => (value.endDate ? new Date(value.endDate) : undefined),
    [value.endDate],
  );

  const handleStartChange = useCallback<(date: Date | null) => void>(
    (date) => {
      if (!date) {
        return;
      }
      onChange({ ...value, startDate: date?.toISOString().split('T')[0] });
    },
    [onChange, value],
  );

  const handleEndChange = useCallback<(date: Date | null) => void>(
    (date) => {
      if (!date) {
        return;
      }
      onChange({ ...value, endDate: date?.toISOString().split('T')[0] });
    },
    [onChange, value],
  );

  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
      <div className="flex items-center justify-end gap-2">
        <span>{words.from}:</span>
        <DatePicker
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full md:w-auto p-2.5"
          selected={startDate}
          onChange={handleStartChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={min(compact([endDate, maxDate]))}
          showMonthDropdown
          showYearDropdown
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <span>{words.to}:</span>
        <DatePicker
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full md:w-auto p-2.5"
          selected={endDate}
          onChange={handleEndChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={maxDate}
          showMonthDropdown
          showYearDropdown
        />
      </div>
    </div>
  );
};
