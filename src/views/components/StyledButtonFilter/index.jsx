import React from 'react';
import PropTypes from 'prop-types';
import { Row, Button } from 'antd';

import './style.less';

const buttonContent = {
  text: '',
};

const StyledButtonFilter = ({ text, ...rest }) => (
  <Row type="flex" justify="end">
    <Button type="ghost" className="btn-search" {...rest}>
      {text}
    </Button>
  </Row>
);

StyledButtonFilter.propTypes = {
  text: PropTypes.string,
};
StyledButtonFilter.defaultProps = {
  text: buttonContent.wrapperCol,
};

export default StyledButtonFilter;
