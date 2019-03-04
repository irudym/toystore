import { call, put } from 'redux-saga/effects';
import { ACTION_TYPES as TYPES, CREATE_ACTION_TYPE } from '../globals/types';
import * as API from '../lib/api';

export default function Records(model) {
  return {
    * fetch(action) {
      try {
        const data = yield call(API[`${model}`].fetch, action.payload);
        yield put({
          type: CREATE_ACTION_TYPE('set', model),
          payload: data,
        });
      } catch (error) {
        yield put({
          type: TYPES.ERROR,
          payload: {
            status: error.status,
            message: error.message,
          },
        });
        console.log(`ERROR: cannot load ${model} due to error: ${error.message}`);
      }
    },

    * fetchByPage(action) {
      try {
        const data = yield call(API[`${model}`].fetchByPage, action.payload);
        yield put({
          type: CREATE_ACTION_TYPE('set/by_page', model),
          payload: data,
        });
        yield put({
          type: TYPES.SUCCESS,
          payload: 'record loaded by page',
        });
      } catch (error) {
        yield put({
          type: TYPES.ERROR,
          payload: {
            status: error.status,
            message: error.message,
          },
        });
        console.log(`ERROR: cannot load ${model} from page: ${action.payload.page} due to error: ${error.message}`);
      }
    },

    * fetchRecord(action) {
      try {
        const data = yield call(API[`${model}`].fetchRecord, action.payload);
        console.log('GET data: ', data);
        
        yield put({
          type: CREATE_ACTION_TYPE('set/record', model),
          payload: data,
        });
      } catch (error) {
        yield put({
          type: TYPES.ERROR,
          payload: {
            status: error.status,
            message: error.message,
          },
        });
        console.log(`ERROR: cannot load a record with id: ${action.payload.id} from ${model} due to error: ${error.message}`);
      }
    },

    * create(action) {
      try {
        console.log('SAGA create: ', action);
        
        const data = yield call(API[`${model}`].create, action.payload);
        yield put({
          type: CREATE_ACTION_TYPE('add', model),
          payload: data,
        });
      } catch (error) {
        yield put({
          type: TYPES.ERROR,
          payload: {
            status: error.status,
            message: error.message,
          },
        });
        console.log(`ERROR: cannot post category ${action.payload.category.name} due to error: ${error.message}`);
      }
    },

    * update(action) {
      try {
        yield call(API[`${model}`].update, action.payload);

        yield put({
          type: CREATE_ACTION_TYPE('change', model),
          payload: action.payload,
        });
      } catch (error) {
        yield put({
          type: TYPES.ERROR,
          payload: {
            status: error.status,
            message: error.message,
          },
        });
        console.log(`ERROR: cannot update category ${action.payload.name} due to error: ${error.message}`);
      }
    },

    * destroy(action) {
      try {
        const data = yield call(API[`${model}`].destroy, action.payload);
        if (data.trash) {
          // move to trash by calling MODEL_TRASH action
          yield put({
            type: CREATE_ACTION_TYPE('trash', model),
            payload: data,
          });
        } else {
          // delete the record permanently
          yield put({
            type: CREATE_ACTION_TYPE('decrease/trash', model),
            payload: {},
          });
        }
      } catch (error) {
        yield put({
          type: TYPES.ERROR,
          payload: {
            status: error.status,
            message: error.message,
          },
        });
        console.log(`ERROR: cannot delete category due to error: ${error.message}`);
      }
    },

    * getInfo(action) {
      try {
        const data = yield call(API[`${model}`].getInfo, action.payload);
        yield put({
          type: CREATE_ACTION_TYPE('set/trash', model),
          payload: data.trash,
        });
        yield put({
          type: CREATE_ACTION_TYPE('set/available', model),
          payload: data.available,
        });
      } catch (error) {
        yield put({
          type: TYPES.ERROR,
          payload: {
            status: error.status,
            message: error.message,
          },
        });
        console.log(`ERROR: cannot information about categories due to error: ${error.message}`);
      }
    },

    * restore(action) {
      try {
        const data = yield call(API[`${model}`].restore, action.payload);
        yield put({
          type: CREATE_ACTION_TYPE('recover', model),
          payload: data,
        });
      } catch (error) {
        yield put({
          type: TYPES.ERROR,
          payload: {
            status: error.status,
            message: error.message,
          },
        });
        console.log(`ERROR: cannot restore category due to error: ${error.message}`);
      }
    },
  };
}
