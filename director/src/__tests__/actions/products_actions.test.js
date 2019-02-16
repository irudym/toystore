import * as actions from '../../redux/actions';
import { ACTION_TYPES, API_TYPES, JOIN_TYPES } from '../../globals/types';

const modelName = 'products';

const types = JOIN_TYPES([ACTION_TYPES, API_TYPES]);

const record = {
  name: 'тест',
  name_eng: 'test',
  description: 'some description',
  images: [],
};

const url = '//127.0.0.0:3030';
const token = '1234567890';

describe(`Actions for ${modelName}`, () => {
  it('creates an action to CREATE (API) a product', () => {
    const expectedAction = {
      type: types.PRODUCTS.CREATE,
      payload: {
        record,
        token,
        url,
      },
    };

    expect(actions.products.create({
      serverUrl: url,
      token,
      record,
    })).toEqual(expectedAction);
  });

  it('creates an action for FETCH (API) products', () => {
    const expectedAction = {
      type: types.PRODUCTS.FETCH,
      payload: {
        token,
        url,
      },
    };
    expect(actions.products.fetch({
      serverUrl: url,
      token,
    })).toEqual(expectedAction);
  });

  it('creates an action for FETCH A RECORD (API) of product', () => {
    const expectedAction = {
      type: types.PRODUCTS.FETCH_RECORD,
      payload: {
        url,
        token,
        id: 100,
      },
    };

    expect(actions.products.fetchRecord({
      serverUrl: url,
      token,
      id: 100,
    })).toEqual(expectedAction);
  });

  it('creates an action to FETCH (API) products by page', () => {
    const expectedAction = {
      type: types.PRODUCTS.FETCH_BY_PAGE,
      payload: {
        url,
        token,
        page: 2,
      },
    };

    expect(actions.products.fetchByPage({
      serverUrl: url,
      token,
      page: 2,
    })).toEqual(expectedAction);
  });

  it('creates an action to get information (INFO API) about the records', () => {
    const expectedAction = {
      type: types.PRODUCTS.GET_INFO,
      payload: {
        url,
        token,
      },
    };

    expect(actions.products.getInfo({
      serverUrl: url,
      token
    })).toEqual(expectedAction);
  });

  it('creates an action to DESTROY a record', () => {
    const expectedAction = {
      type: types.PRODUCTS.DESTROY,
      payload: {
        url,
        token,
        id: 100,
      },
    };

    expect(actions.products.destroy({
      serverUrl: url,
      token,
      id: 100,
    })).toEqual(expectedAction);
  });

  it('creates an action to RESTORE (API) a record', () => {
    const expectedAction = {
      type: types.PRODUCTS.RESTORE,
      payload: {
        url,
        token,
        id: 100,
      },
    };

    expect(actions.products.restore({
      serverUrl: url,
      token,
      id: 100,
    })).toEqual(expectedAction);
  });

  it('creates an action to RECOVER a record in Redux state', () => {
    const expectedAction = {
      type: types.PRODUCTS.RECOVER,
      payload: record,
    };

    expect(actions.products.recover(record)).toEqual(expectedAction);
  });

  it('creates an action to DELETE (REDUX) record from the state', () => {
    const expectedAction = {
      type: types.PRODUCTS.DELETE,
      payload: record,
    };

    expect(actions.products.delete(record)).toEqual(expectedAction);
  });

  it('creates an action to set the current record in the state', () => {
    const expectedAction = {
      type: types.PRODUCTS.SET_RECORD,
      payload: record,
    };

    expect(actions.products.setRecord(record)).toEqual(expectedAction);
  });

  it('creates an action to UPDATE (API) the record', () => {
    const expectedAction = {
      type: types.PRODUCTS.UPDATE,
      payload: {
        url,
        token,
        record,
      },
    };

    expect(actions.products.update({
      serverUrl: url,
      token,
      record,
    })).toEqual(expectedAction);
  });
});
