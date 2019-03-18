import React from 'react';
import PropTypes from 'prop-types';

import { Card, Spin, Icon } from 'antd';

import './style.less';

const spinIcon = <Icon type="loading" />;

const PrivatePageSection = ({ className, cardStyle, children, isLoading }) => {
  const styleProp = cardStyle ? { style: { ...cardStyle } } : {};
  return (
    <Spin
      indicator={spinIcon}
      spinning={isLoading}
      tip="Carregando"
      delay={500}
    >
      <Card
        bordered={false}
        className={`content${className ? ` ${className}` : ''}`}
        {...styleProp}
      >
        {children}
      </Card>
    </Spin>
  );
};

PrivatePageSection.propTypes = {
  t: PropTypes.func,

  isLoading: PropTypes.bool,
  className: PropTypes.string,
  cardStyle: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

PrivatePageSection.defaultProps = {
  isLoading: false,
};

export default PrivatePageSection;
