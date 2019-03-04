import reducer, { initialState } from '../../redux/reducers';
import { ACTION_TYPES } from '../../globals/types';

describe('General reducer', () => {
  it('clears error state and sets success field to true after receives SUCCESS', () => {
    const newState = { ...initialState, currentError: 'test error' };
    expect(reducer(newState, {
      type: ACTION_TYPES.SUCCESS,
      payload: {},
    })).toEqual({
      ...newState,
      currentError: null,
      success: true,
    });
  });
});
