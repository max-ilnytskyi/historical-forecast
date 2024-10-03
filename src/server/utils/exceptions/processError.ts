import { NextResponse } from 'next/server';

import { BaseException } from './BaseException';
import { ServerException } from './ServerException';

import { IS_PRODUCTION } from '@/config';

function prepareErrorResponse<T extends BaseException>(error: T) {
  return {
    ...(error || {}),
    message: error?.message,
    stack: IS_PRODUCTION ? null : error?.stack,
    cause: error?.cause,
    fullMessages: error?.fullMessages,
  };
}

export function processError<T extends BaseException>({
  error,
}: {
  error: T | Error;
}) {
  // TODO handle other errors (401, 404, etc.)

  // default error handling
  return NextResponse.json(
    {
      success: false,
      error: prepareErrorResponse(error as ServerException),
    },
    { status: 500 },
  );
}
