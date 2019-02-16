import { ACTION_TYPES as TYPES } from '../globals/types';

export const reducerForModel = model => (
  {
    [TYPES[`${model.toUpperCase()}`].SET]: (state, action) => (
      {
        ...state,
        [`${model}`]: {
          ...state[`${model}`],
          records: action.payload,
          available: action.payload.length,
        },
      }
    ),
    [TYPES[`${model.toUpperCase()}`].SET_BY_PAGE]: (state, action) => (
      {
        ...state,
        [`${model}`]: {
          ...state[`${model}`],
          records: action.payload[`${model}`],
          pages: action.payload.pages,
          currentPage: action.payload.page,
        },
      }
    ),
    [TYPES[`${model.toUpperCase()}`].ADD]: (state, action) => (
      {
        ...state,
        [`${model}`]: {
          ...state[`${model}`],
          available: state[`${model}`].available + 1,
          records: [
            {
              ...action.payload,
              recent: true,
            },
            ...state[`${model}`].records,
          ],
        },
      }
    ),
    [TYPES[`${model.toUpperCase()}`].SET_TRASH]: (state, action) => (
      {
        ...state,
        [`${model}`]: {
          ...state[`${model}`],
          trash: action.payload,
        },
      }
    ),
    [TYPES[`${model.toUpperCase()}`].SET_AVAILABLE]: (state, action) => (
      {
        ...state,
        [`${model}`]: {
          ...state[`${model}`],
          available: action.payload,
        },
      }
    ),
    [TYPES[`${model.toUpperCase()}`].INCREASE_TRASH]: (state, action) => (
      {
        ...state,
        [`${model}`]: {
          ...state[`${model}`],
          trash: state[`${model}`].trash + 1,
        },
      }
    ),
    [TYPES[`${model.toUpperCase()}`].DECREASE_TRASH]: (state, action) => (
      {
        ...state,
        [`${model}`]: {
          ...state[`${model}`],
          trash: state[`${model}`].trash - 1,
        },
      }
    ),
    [TYPES[`${model.toUpperCase()}`].TRASH]: (state, action) => (
      {
        ...state,
        [`${model}`]: {
          ...state[`${model}`],
          records: state[`${model}`].records.filter(record => record.id !== action.payload.id),
          trash: state[`${model}`].trash + 1,
          available: state[`${model}`].available - 1,
        },
      }
    ),
    [TYPES[`${model.toUpperCase()}`].RECOVER]: (state, action) => (
      {
        ...state,
        [`${model}`]: {
          ...state[`${model}`],
          available: state[`${model}`].available + 1,
          trash: state[`${model}`].trash - 1,
          records: [
            {
              ...action.payload,
              recent: true,
            },
            ...state[`${model}`].records,
          ],
        },
      }
    ),
    [TYPES[`${model.toUpperCase()}`].DELETE]: (state, action) => (
      {
        ...state,
        [`${model}`]: {
          ...state[`${model}`],
          trash: state[`${model}`].trash - 1,
        },
      }
    ),
    [TYPES[`${model.toUpperCase()}`].SET_RECORD]: (state, action) => (
      {
        ...state,
        [`${model}`]: {
          ...state[`${model}`],
          current: action.payload,
        },
      }
    ),
    [TYPES[`${model.toUpperCase()}`].CHANGE]: (state, action) => (
      {
        ...state,
        [`${model}`]: {
          ...state[`${model}`],
          records: state[`${model}`].records.map((record) => {
            if (record.id === action.payload.record.id) return action.payload.record;
            return record;
          }),
        },
      }
    ),
    [TYPES[`${model.toUpperCase()}`].CLEAR_CURRENT]: (state, action) => (
      {
        ...state,
        [`${model}`]: {
          ...state[`${model}`],
          // TODO: need to clear all fields
          current: null,
        },
      }
    ),
  }
);
