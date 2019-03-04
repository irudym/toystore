/**
 * Igor Rudym (C) 2019
 */
import { ACTION_TYPES as TYPES } from '../globals/types';
import { reducerForModel } from './for_model';


const ACTION_HANDLERS = {
  [TYPES.AUTHORIZE]: (state, action) => (
    {
      ...state,
      auth: {
        isAuthenticated: action.value.isAuthenticated,
        token: action.value.authToken,
        user: action.value.authUser,
      },
    }
  ),
  [TYPES.DEAUTHORIZE]: (state, action) => (
    {
      ...state,
      auth: {
        isAuthenticated: false,
        token: null,
        user: null,
      },
    }
  ),
  [TYPES.ERROR]: (state, action) => (
    {
      ...state,
      errors: [
        action.payload, // error: {status: , message: }
        ...state.errors,
      ],
      currentError: action.payload.message,
      success: false,
    }
  ),
  [TYPES.RESET_ERROR]: (state, action) => (
    {
      ...state,
      currentError: null,
    }
  ),
  [TYPES.SUCCESS]: (state, action) => (
    {
      ...state,
      currentError: null,
      success: true,
    }
  ),

  ...reducerForModel('categories'),
  ...reducerForModel('colours'),
  ...reducerForModel('materials'),
  ...reducerForModel('products'),
  ...reducerForModel('brands'),
  ...reducerForModel('types'),
};

/**
 * Reducers
 */

const modelState = {
  records: [],
  pages: 0,
  currentPage: 1,
  trash: 0, // amount of records in the trash bin
  available: 0, // overall amount of available (all - trash) records
  current: {},
};

export const initialState = {
  auth: {
    token: null,
    user: null,
    isAuthenticated: false,
  },
  errors: [],
  currentError: '',
  categories: modelState,
  colours: modelState,
  materials: modelState,
  products: modelState,
  brands: modelState,
  types: modelState,
};

const directorReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default directorReducer;
