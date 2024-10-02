import camelcaseKeys from 'camelcase-keys';

export class ResponseFormatter {
  static index<T>({ scope, nodes }: { scope: string; nodes: T[] }) {
    return {
      [scope]: {
        nodes: camelcaseKeys(nodes as Record<string, unknown>[], {
          deep: true,
        }),
      },
    };
  }
}
