/**
 * Helpers functions
 */
import { constructError } from './errors';

export default function Records(modelName) {
  return {
    fetch: async ({ url, token }) => {
      console.log('Fetch records for model: ', modelName);

      const response = await fetch(`${url}/${modelName}`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw constructError(response, data);
      }
      return data;
    },

    fetchRecord: async ({
      url,
      token,
      id,
    }) => {
      const response = await fetch(`${url}/${modelName}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw constructError(response, data);
      }
      return data;
    },

    fetchByPage: async ({
      url,
      token,
      page,
    }) => {
      const response = await fetch(`${url}/${modelName}/pages/${page}`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw constructError(response, data);
      }
      return data;
    },

    fetchTrash: async ({ url, token }) => {
      const response = await fetch(`${url}/${modelName}/trash`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw constructError(response, data);
      }
      return data;
    },

    create: async ({
      url,
      token,
      record,
    }) => {
      console.log(`API::createRecord[${url}/${modelName}]: record: ${record}`);
      const response = await fetch(`${url}/${modelName}`, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });
      const data = await response.json();
      if (!response.ok) {
        throw constructError(response, data);
      }
      return data;
    },

    update: async ({
      url,
      token,
      record,
    }) => {
      const response = await fetch(`${url}/${modelName}/${record.id}`, {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });
      // const data = await response.json();
      if (!response.ok) {
        throw constructError(response, response);
      }
      if (response.status === 202) {
        const data = await response.json();
        return data;
      }
      return null;
    },

    destroy: async ({ url, token, id }) => {
      const response = await fetch(`${url}/${modelName}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw constructError(response, data);
      }
      return data;
    },

    restore: async ({ url, token, id }) => {
      const response = await fetch(`${url}/${modelName}/trash/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      // const data = await response.json();
      if (!response.ok) {
        throw constructError(response, response);
      }
      return {};
    },

    getInfo: async ({ url, token }) => {
      const response = await fetch(`${url}/${modelName}/info`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw constructError(response, data);
      }
      return data;
    },
  };
}
