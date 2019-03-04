import { ACTION_TYPES, API_TYPES, JOIN_TYPES } from '../globals/types';

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
  MATERIALS: {
    ...ACTION_TYPES.MATERIALS,
    ...API_TYPES.MATERIALS,
  },
};
*/
const TYPES = JOIN_TYPES([ACTION_TYPES, API_TYPES]);


const actionsFor = model => ({
  create: value => ({
    type: TYPES[`${model.toUpperCase()}`].CREATE,
    payload: {
      url: value.serverUrl,
      token: value.token,
      record: value.record,
    },
  }),

  fetch: value => ({
    type: TYPES[`${model.toUpperCase()}`].FETCH,
    payload: {
      url: value.serverUrl,
      token: value.token,
    },
  }),

  fetchRecord: value => ({
    type: TYPES[`${model.toUpperCase()}`].FETCH_RECORD,
    payload: {
      url: value.serverUrl,
      token: value.token,
      id: value.id,
    },
  }),

  fetchByPage: value => ({
    type: TYPES[`${model.toUpperCase()}`].FETCH_BY_PAGE,
    payload: {
      url: value.serverUrl,
      token: value.token,
      page: value.page,
    },
  }),

  getInfo: value => ({
    type: TYPES[`${model.toUpperCase()}`].GET_INFO,
    payload: {
      url: value.serverUrl,
      token: value.token,
    },
  }),

  destroy: value => ({
    type: TYPES[`${model.toUpperCase()}`].DESTROY,
    payload: {
      url: value.serverUrl,
      token: value.token,
      id: value.id,
    },
  }),

  restore: value => ({
    type: TYPES[`${model.toUpperCase()}`].RESTORE,
    payload: {
      url: value.serverUrl,
      token: value.token,
      id: value.id,
    },
  }),

  recover: value => ({
    type: TYPES[`${model.toUpperCase()}`].RECOVER,
    payload: value,
  }),

  // delete the record permanently from Database
  delete: value => ({
    type: TYPES[`${model.toUpperCase()}`].DELETE,
    payload: value,
  }),

  setRecord: value => ({
    type: TYPES[`${model.toUpperCase()}`].SET_RECORD,
    payload: value,
  }),

  update: value => ({
    type: TYPES[`${model.toUpperCase()}`].UPDATE,
    payload: {
      url: value.serverUrl,
      token: value.token,
      record: value.record,
    },
  }),

  clearCurrent: value => ({
    type: TYPES[`${model.toUpperCase()}`].CLEAR_CURRENT,
    payload: {},
  }),
});


export const categories = actionsFor('categories');
export const products = actionsFor('products');
export const brands = actionsFor('brands');
export const types = actionsFor('types');
export const colours = actionsFor('colours');
export const materials = actionsFor('materials');
// TODO: refract code for colours and materials

export const authorizeUser = value => (
  {
    type: TYPES.AUTHORIZE,
    payload: {
      ...value,
    },
  }
);

export const deauthorizeUser = value => (
  {
    type: TYPES.DEAUTHORIZE,
    payload: {},
  }
);


/**
 * API related actions
 */
export const loginUser = value => (
  {
    type: TYPES.LOGIN_USER,
    payload: {
      url: value.serverUrl,
      user: {
        email: value.email,
        password: value.password,
      },
    },
  }
);

export const postError = payload => (
  {
    type: TYPES.ERROR,
    payload,
  }
);

export const resetError = () => (
  {
    type: TYPES.RESET_ERROR,
  }
);

export const postSuccess = payload => (
  {
    type: TYPES.SUCCESS,
    payload,
  }
);


export const fetchMaterialsByPage = value => (
  {
    type: TYPES.MATERIALS.FETCH_BY_PAGE,
    payload: {
      url: value.serverUrl,
      token: value.token,
      page: value.page,
    },
  }
);

export const getMaterialsInfo = value => (
  {
    type: TYPES.MATERIALS.GET_INFO,
    payload: {
      url: value.serverUrl,
      token: value.token,
    },
  }
);

export const destroyMaterial = value => (
  {
    type: TYPES.MATERIALS.DESTROY,
    payload: {
      url: value.serverUrl,
      token: value.token,
      id: value.id,
    },
  }
);

export const recoverMaterial = value => (
  {
    type: TYPES.MATERIALS.RECOVER,
    payload: value,
  }
);

export const deleteMaterial = value => (
  {
    type: TYPES.MATERIALS.DELETE,
    payload: value,
  }
);

export const createMaterial = value => (
  {
    type: TYPES.MATERIALS.CREATE,
    payload: {
      url: value.serverUrl,
      token: value.token,
      record: {
        name: value.name,
        name_eng: value.nameEng,
        description: value.description,
      },
    },
  }
);

export const fetchMaterial = value => (
  {
    type: TYPES.MATERIALS.FETCH_RECORD,
    payload: {
      url: value.serverUrl,
      token: value.token,
      id: value.id,
    },
  }
);

export const setMaterial = value => (
  {
    type: TYPES.MATERIALS.SET_RECORD,
    payload: value,
  }
);

export const updateMaterial = value => (
  {
    type: TYPES.MATERIALS.UPDATE,
    payload: {
      url: value.serverUrl,
      token: value.token,
      record: value.material,
    },
  }
);
