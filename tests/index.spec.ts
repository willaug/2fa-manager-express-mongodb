import simpleCalcToRemoveAfter from '../src/index';

describe('testing', () => {
  it('should be able to sum values in array', () => {
    const values = [1, 2, 0];
    const result = simpleCalcToRemoveAfter(values);
    expect(result).toEqual(3);
  });
});
