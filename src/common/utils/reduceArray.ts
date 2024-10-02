/**
 * Reduces the size of an array to a specified base size by selecting elements at calculated intervals.
 *
 * @param {T[]} arr - The array to be reduced.
 * @param {number} baseSize - The desired size of the reduced array.
 * @returns {T[]} - The reduced array containing elements selected at calculated intervals.
 */
export function reduceArray<T>(arr: T[], baseSize: number): T[] {
  if (arr.length <= baseSize * 2) {
    return arr;
  }

  const result: T[] = [arr[0]];
  const steps = (arr.length - 2) / (baseSize - 2);

  for (let i = 1; i < baseSize - 1; i++) {
    const index = Math.round(i * steps);
    result.push(arr[index]);
  }

  result.push(arr[arr.length - 1]);
  return result;
}
