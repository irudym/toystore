// constructors
export const CREATE_ACTION_TYPE = (action, model) => {
  const modelName = model.toUpperCase();
  return `${modelName}/${action.toUpperCase()}`;
};

export const CREATE_API_TYPE = (action, model) => {
  const modelName = model.toUpperCase();
  return `API/${action.toUpperCase()}/${modelName}`;
};

/**
 * JOIN_TYPES - join objects without overriding internal objects (1 level)
 * @param {Array} types  array of objects to joint
 */
export const JOIN_TYPES = types => (
  types.reduce((acc, object) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(object)) {
      if (typeof value === 'object') {
        // check if acc already has such object
        if (acc[`${key}`]) {
          Object.assign(acc[`${key}`], value);
        } else Object.assign(acc, { [`${key}`]: value });
      } else acc = { ...acc, [`${key}`]: value };
    }
    return acc;
  }, {})
);

export const typesFor = model => (
  {
    SET: CREATE_ACTION_TYPE('set', model),
    SET_RECORD: CREATE_ACTION_TYPE('set/record', model),
    SET_BY_PAGE: CREATE_ACTION_TYPE('set/by_page', model),
    ADD: CREATE_ACTION_TYPE('add', model),
    DELETE: CREATE_ACTION_TYPE('delete', model),
    TRASH: CREATE_ACTION_TYPE('trash', model),
    SET_AVAILABLE: CREATE_ACTION_TYPE('set/available', model),
    SET_TRASH: CREATE_ACTION_TYPE('set/trash', model),
    INCREASE_TRASH: CREATE_ACTION_TYPE('increase/trash', model),
    DECREASE_TRASH: CREATE_ACTION_TYPE('decrease/trash', model),
    RECOVER: CREATE_ACTION_TYPE('recover', model),
    CHANGE: CREATE_ACTION_TYPE('change', model),
    CLEAR_CURRENT: CREATE_ACTION_TYPE('current/clear', model),
  }
);

export const sagaTypesFor = model => (
  {
    FETCH: CREATE_API_TYPE('fetch', model),
    FETCH_RECORD: CREATE_API_TYPE('fetch/record', model),
    FETCH_BY_PAGE: CREATE_API_TYPE('fetch/by_page', model),
    CREATE: CREATE_API_TYPE('create', model),
    DESTROY: CREATE_API_TYPE('destroy', model),
    GET_INFO: CREATE_API_TYPE('get/info', model),
    RESTORE: CREATE_API_TYPE('restore', model),
    UPDATE: CREATE_API_TYPE('update', model),
  }
);


export const ACTION_TYPES = {
  AUTHORIZE: 'SYSTEM/AUTHORIZE',
  DEAUTHORIZE: 'SYSTEM/DEAUTHORIZE',
  ERROR: 'SYSTEM/ERROR',
  RESET_ERROR: 'SYSTEM/RESET_ERROR',
  SUCCESS: 'SYSTEM/SUCCESS',
  CATEGORIES: typesFor('categories'),
  COLOURS: typesFor('colours'),
  MATERIALS: typesFor('materials'),
  PRODUCTS: typesFor('products'),
  BRANDS: typesFor('brands'),
  TYPES: typesFor('types'),
};

export const API_TYPES = {
  CATEGORIES: sagaTypesFor('categories'),
  COLOURS: sagaTypesFor('colours'),
  MATERIALS: sagaTypesFor('materials'),
  PRODUCTS: sagaTypesFor('products'),
  BRANDS: sagaTypesFor('brands'),
  TYPES: sagaTypesFor('types'),
  LOGIN_USER: 'API/LOGIN_USER',
};
