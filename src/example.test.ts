import * as example from './example.json';
import { validate } from './validator';

describe.skip('Example IR', () => {
  it('is valid', () => {
    const result = validate(example);

    expect(result.errors).toEqual([]);
  });

  it('is invalid', () => {
    const result = validate({});

    expect(result.errors).not.toEqual([]);
  });
});
