/**
 * Igor Rudym (C) 2019
 *
 * Saga actions to fetch and pass data to candore-core API
 * more about Saga: https://github.com/redux-saga/redux-saga
 */
import {
  call,
  put,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import * as API from '../lib/api';
import { ACTION_TYPES, API_TYPES, CREATE_API_TYPE, JOIN_TYPES } from '../globals/types';

import Records from './records';

/*
const TYPES = {
  ...ACTION_TYPES,
  ...API_TYPES,
  COLOURS: {
    ...ACTION_TYPES.COLOURS,
    ...API_TYPES.COLOURS,
  },
  CATEGORIES: {
    ...ACTION_TYPES.CATEGORIES,
    ...API_TYPES.CATEGORIES,
  },
};
*/
const TYPES = JOIN_TYPES([ACTION_TYPES, API_TYPES]);

const categories = Records('categories');
const colours = Records('colours');
const materials = Records('materials');
const brands = Records('brands');
const types = Records('types');
const products = Records('products');

export function* loginUser(action) {
  try {
    const data = yield call(API.loginUser, action.payload);
    yield put({
      type: TYPES.AUTHORIZE,
      value: {
        isAuthenticated: true,
        authUser: action.payload.user.email,
        authToken: data.auth_token,
      },
    });
    yield put({
      type: TYPES.SUCCESS,
      payload: 'user logged in',
    });
  } catch (error) {
    yield put({
      type: TYPES.ERROR,
      payload: { ...error },
    });
    console.log(`ERROR: cannot authenticate the user: ${action.payload.user.email} due to error: ${error.message}`);
  }
}

const modelActionMap = (model, name) => (
  [
    {
      apply: () => takeLatest(CREATE_API_TYPE('fetch', name), model.fetch),
    },
    {
      apply: () => takeLatest(CREATE_API_TYPE('fetch/by_page', name), model.fetchByPage),
    },
    {
      apply: () => takeEvery(CREATE_API_TYPE('create', name), model.create),
    },
    {
      apply: () => takeLatest(CREATE_API_TYPE('get/info', name), model.getInfo),
    },
    {
      apply: () => takeEvery(CREATE_API_TYPE('destroy', name), model.destroy),
    },
    {
      apply: () => takeEvery(CREATE_API_TYPE('restore', name), model.restore),
    },
    {
      apply: () => takeLatest(CREATE_API_TYPE('fetch/record', name), model.fetchRecord),
    },
    {
      apply: () => takeEvery(CREATE_API_TYPE('update', name), model.update),
    },
  ]
);

export default function* rootSaga() {
  yield takeLatest(TYPES.LOGIN_USER, loginUser);

  // apply models actions
  yield modelActionMap(categories, 'categories').map(action => action.apply());
  yield modelActionMap(colours, 'colours').map(action => action.apply());
  yield modelActionMap(materials, 'materials').map(action => action.apply());
  yield modelActionMap(brands, 'brands').map(action => action.apply());
  yield modelActionMap(types, 'types').map(action => action.apply());
  yield modelActionMap(products, 'products').map(action => action.apply());
}
