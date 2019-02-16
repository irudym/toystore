import { JOIN_TYPES } from '../../globals/types';


describe('Action types tools', () => {
  describe('Join action tool', () => {

    it('joins all actions types in one object', () => {
      const ACTION_TYPES = {
        AUTHORIZE: 'SYSTEM/AUTHORIZE',
        DEAUTHORIZE: 'SYSTEM/DEAUTHORIZE',
        ERROR: 'SYSTEM/ERROR',
        COLOURS: {
          ADD: 'COLOURS/ADD',
          SET: 'COLOURS/SET',
        },
        PRODUCTS: {
          ADD: 'PRODUCTS/ADD',
          SET: 'PRODUCTS/SET',
        },
      };

      const API_TYPES = {
        COLOURS: {
          FETCH: 'COLOURS/FETCH',
          CREATE: 'COLOURS/CREATE',
        },
        PRODUCTS: {
          FETCH: 'PRODUCTS/FETCH',
          CREATE: 'PRODUCTS/CREATE',
        },
      };

      const expectedTYPES = {
        AUTHORIZE: 'SYSTEM/AUTHORIZE',
        DEAUTHORIZE: 'SYSTEM/DEAUTHORIZE',
        ERROR: 'SYSTEM/ERROR',
        COLOURS: {
          ADD: 'COLOURS/ADD',
          SET: 'COLOURS/SET',
          FETCH: 'COLOURS/FETCH',
          CREATE: 'COLOURS/CREATE',
        },
        PRODUCTS: {
          ADD: 'PRODUCTS/ADD',
          SET: 'PRODUCTS/SET',
          FETCH: 'PRODUCTS/FETCH',
          CREATE: 'PRODUCTS/CREATE',
        },
      };

      expect(JOIN_TYPES([ACTION_TYPES, API_TYPES])).toEqual(expectedTYPES);
    });
  });
});
