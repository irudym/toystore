import reducer, { initialState } from '../../redux/reducers';
import { ACTION_TYPES, API_TYPES, JOIN_TYPES } from '../../globals/types';

const types = JOIN_TYPES([ACTION_TYPES, API_TYPES]);

const record = {
  id: 100,
  name: 'зелёный',
  name_end: 'green',
  hex: '00FF00',
};

describe('Colours reducer', () => {
  describe('state actions', () => {
    it('returns initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('handles ADD action', () => {
      expect(reducer(undefined, {
        type: types.COLOURS.ADD,
        payload: record,
      })).toEqual({
        ...initialState,
        colours: {
          ...initialState.colours,
          available: 1,
          records: [
            {
              ...record,
              recent: true,
            },
          ],
        },
      });
    });

    it('handles SET (list of records) actions', () => {
      expect(reducer(undefined, {
        type: types.COLOURS.SET,
        payload: [record],
      })).toEqual({
        ...initialState,
        colours: {
          ...initialState.colours,
          records: [record],
          available: 1,
        },
      });
    });

    it('handles SET_BY_PAGE (load data from API paginated) action', () => {
      expect(reducer(undefined, {
        type: types.COLOURS.SET_BY_PAGE,
        payload: {
          colours: [record],
          pages: 1,
          page: 1,
        },
      })).toEqual({
        ...initialState,
        colours: {
          ...initialState.colours,
          records: [record],
          pages: 1,
          currentPage: 1,
        },
      });
    });
  });

  it('handles SET_TRASH (set amount od records in trash bin) action', () => {
    expect(reducer(undefined, {
      type: types.COLOURS.SET_TRASH,
      payload: 10,
    })).toEqual({
      ...initialState,
      colours: {
        ...initialState.colours,
        trash: 10,
      },
    });
  });

  it('handles SET_AVAILABLE (amount off all records except which are in trash bin) action', () => {
    expect(reducer(undefined, {
      type: types.COLOURS.SET_AVAILABLE,
      payload: 10,
    })).toEqual({
      ...initialState,
      colours: {
        ...initialState.colours,
        available: 10,
      },
    });
  });

  it('handles TRASH (change amount of records in trash and records available) action', () => {
    const state = {
      ...initialState,
      colours: {
        ...initialState.colours,
        records: [record],
        trash: 0,
        available: 1,
      },
    };
    expect(reducer(state, {
      type: types.COLOURS.TRASH,
      payload: {
        id: record.id,
      },
    })).toEqual({
      ...initialState,
      colours: {
        ...initialState.colours,
        trash: 1,
        available: 0,
        records: [],
      },
    });
  });

  it('handles RECOVER (decrease amount of trash records and put the record to global records list) action', () => {
    expect(reducer(undefined, {
      type: types.COLOURS.RECOVER,
      payload: record,
    })).toEqual({
      ...initialState,
      colours: {
        ...initialState.colours,
        trash: -1,
        available: 1,
        records: [{
          ...record,
          recent: true,
        }],
      },
    });
  });

  it('handles DELETE (decrease of trash counter) action', () => {
    expect(reducer(undefined, {
      type: types.COLOURS.DELETE,
    })).toEqual({
      ...initialState,
      colours: {
        ...initialState.colours,
        trash: -1,
      },
    });
  });

  it('handles SET_RECORD (current record for editing purposes) action', () => {
    expect(reducer(undefined, {
      type: types.COLOURS.SET_RECORD,
      payload: record,
    })).toEqual({
      ...initialState,
      colours: {
        ...initialState.colours,
        current: record,
      },
    });
  });

  it('handles CHANGE action', () => {
    const state = {
      ...initialState,
      colours: {
        ...initialState.colours,
        records: [record],
      },
    };
    const newRecord = {
      ...record,
      name: 'красный',
      name_end: 'red',
      hex: 'FF0000',
    };
    expect(reducer(state, {
      type: types.COLOURS.CHANGE,
      payload: {
        record: newRecord,
      },
    })).toEqual({
      ...initialState,
      colours: {
        ...initialState.colours,
        records: [newRecord],
      },
    });
  });
});
