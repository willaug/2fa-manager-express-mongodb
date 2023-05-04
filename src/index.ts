export default function simpleCalcToRemoveAfter(values: number[]): number {
  return values.reduce((arr, current) => current + arr, 0);
}
