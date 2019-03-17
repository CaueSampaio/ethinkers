import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

const formItemLayout = {
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 24 },
    md: { span: 24 },
  },
};

const StyledFormItem = ({ wrapperCol, ...rest }) => (
  <Form.Item wrapperCol={wrapperCol} {...rest} />
);

StyledFormItem.propTypes = {
  wrapperCol: PropTypes.object,
};
StyledFormItem.defaultProps = {
  wrapperCol: formItemLayout.wrapperCol,
};

export default StyledFormItem;
