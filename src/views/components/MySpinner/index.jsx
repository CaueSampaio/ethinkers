import React from 'react';
import { Spin, Icon } from 'antd';

const indicator = <Icon type="loading" />;
const tip = 'Carregando';

const MySpinner = (props) => (
  <Spin tip={tip} indicator={indicator} {...props} />
);

MySpinner.defaultProps = {
  spinning: false,
};

export const SmallSpinner = () => <Spin tip={tip} indicator={indicator} />;

export const spinnerAtrr = {
  tip,
  indicator,
};

export default MySpinner;
