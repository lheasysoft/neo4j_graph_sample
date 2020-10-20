
export interface NeoResult<T> {
  identity: {
    low: number;
    high: number;
  }
  labels: string[];
  properties: T;
}
