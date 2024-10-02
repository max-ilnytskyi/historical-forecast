import isEmpty from 'lodash/isEmpty';

import { ApiRequest } from '@/common/utils/ApiRequest';
import {
  AxiosRequestErrorType,
  FetchIndexQueryBaseParams,
  PayloadErrorType,
} from '@/types';

interface BaseGetActionOptions {
  path: string;
  params?: FetchIndexQueryBaseParams;
}

export async function baseGetAction<T>({
  path,
  params,
}: BaseGetActionOptions): Promise<T> {
  try {
    const response = await ApiRequest.get<T>(path, params);

    return response.data;
  } catch (err) {
    throw isEmpty(
      (err as AxiosRequestErrorType<PayloadErrorType>)?.response?.data?.error
        ?.fullMessages,
    )
      ? err
      : (err as AxiosRequestErrorType<PayloadErrorType>)?.response?.data?.error;
  }
}
