import isArray from 'lodash/isArray';

import { payloadErrorTypeDef } from './utils/payloadErrorTypeDef';
import { checkAxiosErrorStatus } from './utils/checkAxiosErrorStatus';
import { axiosErrorTypeDef } from './utils/axiosErrorTypeDef';

import { errors } from '@/texts';

const defaultServerError = errors.invalidServerResponse;
const defaultClientError = errors.requestTimeout;
const default404Error = errors.recordNotFound;

function parseRequestError(error: unknown): string | null {
  if (!error) {
    return null;
  }

  if (payloadErrorTypeDef(error) && isArray(error?.fullMessages)) {
    return error.fullMessages.join(', ') || defaultServerError;
  }

  if (checkAxiosErrorStatus(error, /5\d{2}/)) {
    return defaultServerError;
  }

  if (checkAxiosErrorStatus(error, 404)) {
    return default404Error;
  }

  if (axiosErrorTypeDef(error)) {
    if (error?.message) {
      const regex = /"message":"(.*?)"/;
      const match = error.message.match(regex);

      return match ? match[1] : defaultServerError;
    }

    return defaultServerError;
  }

  return defaultClientError;
}

export default parseRequestError;
