'use client';
import axios from 'axios';
import join from 'lodash/join';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import snakeCase from 'lodash/snakeCase';
import map from 'lodash/map';

import { FetchIndexQueryBaseParams } from '@/types';

import { API_PATH } from '@/config';

const apiUrl =
  typeof window === 'undefined'
    ? null
    : join([window.location.origin, API_PATH], '');

function headers(additionalHeaders?: Record<string, string | number>) {
  return {
    headers: {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    },
  };
}

export class ApiRequest {
  static _url(path: string) {
    return [apiUrl, path].join('/');
  }
  static _urlWithParams(path: string, options?: FetchIndexQueryBaseParams) {
    return isEmpty(options)
      ? this._url(path)
      : this._url(
          [
            path,
            compact(
              map(options, (value, key) =>
                value
                  ? [snakeCase(key), JSON.stringify(value)].join('=')
                  : null,
              ),
            ).join('&'),
          ].join('?'),
        );
  }

  static get<T = unknown>(path: string, options?: FetchIndexQueryBaseParams) {
    return axios.get<T>(this._urlWithParams(path, options), headers());
  }
}
