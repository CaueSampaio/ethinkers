const constntApi =
  process.env.NODE_ENV === 'development'
    ? 'https://private-ade86f-merhy.apiary-mock.com'
    : `www.api.it4360.com.br`;

export const API = constntApi.replace(window.location.origin, '');

export const USER_DISCRIMINATORS = {
  company: 1,
  companyBranch: 2,
};

export const getAllDiscriminators = () => Object.values(USER_DISCRIMINATORS);

export const getWorkflowDiscriminators = () =>
  Object.keys(USER_DISCRIMINATORS).filter(
    (key) => key === USER_DISCRIMINATORS.company,
  );
