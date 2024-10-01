import { NextRequest } from 'next/server';

import { IndexQueryOptions } from '@/server/server.types';

export class ParseIndexQuery<FILTERS = Record<string, unknown>> {
  searchParams: URLSearchParams;
  constructor(req: NextRequest) {
    this.searchParams = req?.nextUrl?.searchParams;
  }

  parse(): IndexQueryOptions<FILTERS> {
    return {
      filters: this.parseFilters(),
    };
  }

  parseFilters(): FILTERS | undefined {
    const filters = this.searchParams.get('filters') as string;
    return filters ? JSON.parse(filters) : undefined;
  }
}
