import serverReducer, { serverReducerInitialState, updateServerStatus } from './server-reducer';

describe('Reducer: serverReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(serverReducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
      status: null,
    });
  });

  it('should update status by update', () => {
    const state = serverReducerInitialState;
    expect(serverReducer(state, updateServerStatus(404))).toEqual({
      status: 404,
    });
  });
});
