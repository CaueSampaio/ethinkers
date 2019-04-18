const channelProductStatus = [
  {
    status: 'Não Curado',
    value: 0,
  },
  {
    status: 'Curado',
    value: 1,
  },
  {
    status: 'Recusado pelo Master',
    value: 2,
  },
  {
    status: 'Em análise Master',
    value: 3,
  },
  {
    status: 'Sincronizando',
    value: 4,
  },
  {
    status: 'Erro de integração',
    value: 5,
  },
  {
    status: 'Ativo',
    value: 6,
  },
  {
    status: 'Desativado',
    value: 7,
  },
];

const channelProductUpdateStatus = [
  {
    status: 'Em análise master',
    value: 0,
  },
  {
    status: 'Recusado pelo master',
    value: 1,
  },
  {
    status: 'Sincronizando',
    value: 2,
  },
  {
    status: 'Erro na integração',
    value: 3,
  },
  {
    status: 'Sincronizando',
    value: 4,
  },
];

export default {
  channelProductStatus,
  channelProductUpdateStatus,
};
