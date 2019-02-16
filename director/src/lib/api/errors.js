export const constructError = (response, data) => (
  {
    status: response.status,
    message: data.message || response.statusText,
  }
);
