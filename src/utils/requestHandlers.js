import { isEmpty } from 'lodash';

const successRequestHandler = (res) => res.data;

const errorRequestHandler = (err) => {
  const { response } = err;

  if (isEmpty(response)) {
    return Promise.reject({
      status: 500,
      message: 'Internal Server Error',
    });
  }

  const { status } = response;

  if (response.status === 400) {
    const { data } = response;
    const { message } = data;

    return Promise.reject({
      status,
      message: message || 'Bad Request',
      errorsMessage: data,
    });
  }

  if (response.status === 401) {
    return Promise.reject({
      status,
      message: 'Unauthorized',
    });
  }

  if (response.status === 403) {
    const {
      data: { Errors: errors },
    } = response;

    return Promise.reject({
      status,
      message: 'Não autorizado.',
      errors,
    });
  }

  if (response.status === 406) {
    const { data } = response;
    const { message, Errors: errors } = data;

    return Promise.reject({
      status,
      message: message || 'Not Acceptable',
      errors,
    });
  }

  if (response.status === 422) {
    const { data } = response;
    const { error } = data;

    return Promise.reject({
      status,
      message: 'Não foi possível concluir a ação',
      errors: error,
    });
  }

  return Promise.reject({
    status: 500,
    message: 'Internal Server Error',
  });
};

export default {
  success: successRequestHandler,
  error: errorRequestHandler,
};
