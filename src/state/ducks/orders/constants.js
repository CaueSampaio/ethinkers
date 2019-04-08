const orderStatusEnum = [
  {
    status: 'Pronto para manuseio',
    value: 0,
  },
  {
    status: 'Handling',
    value: 1,
  },
  {
    status: 'Invoiced',
    value: 2,
  },
  {
    status: 'Dispatched',
    value: 3,
  },
  {
    status: 'Canceled',
    value: 4,
  },
  {
    status: 'Invoicing',
    value: 5,
  },
  {
    status: 'InvoicingError',
    value: 6,
  },
  {
    status: 'Canceling',
    value: 7,
  },
  {
    status: 'CancellationError',
    value: 8,
  },
  {
    status: 'Dispatching',
    value: 9,
  },
  {
    status: 10,
    value: 'DispatchingError',
  },
];

export default {
  orderStatusEnum,
};
