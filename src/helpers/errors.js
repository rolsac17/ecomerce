
export const getErrorMessage = (err) => {
  let error = '';

  if (err.response) {
    if (err.response.data) {
      if (err.response.data.message) {
        error = err.response.data.message;
      } else {
        error = err.message;
      }
    } else {
      error = err.message;
    }
  } else {
    error = err.message;
  }

  return error;
}