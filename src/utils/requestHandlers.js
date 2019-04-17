import { isEmpty } from 'lodash';

import { history } from '../index';

const successRequestHandler = (res) => res.data;

const errorRequestHandler = (err) => {
  const { response } = err;

  if (isEmpty(response)) {
    return Promise.reject({
      status: 500,
      message: 'Não foi possível concluir a ação',
      errors: 'Erro no servidor',
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
    const { push } = history;

    push('/login');
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
    message: 'Não foi possível concluir a ação',
  });
};

export default {
  success: successRequestHandler,
  error: errorRequestHandler,
};
