import * as actions from '../../redux/actions';
import { ACTION_TYPES } from '../../globals/types';


describe('General actions', () => {
  it('creates an action to show that last operation was successful', () => {
    const expectedAction = {
      type: ACTION_TYPES.SUCCESS,
      payload: {},
    };

    expect(actions.postSuccess({})).toEqual(expectedAction);
  });
});
