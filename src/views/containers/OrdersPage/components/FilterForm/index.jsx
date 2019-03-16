import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form, InputNumber } from 'antd';

const FormItem = Form.Item;

class FilterForm extends Component {
  state = {};

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form layout="vertical">
        <FormItem label="Código:">
          {getFieldDecorator('number', {})(<InputNumber />)}
        </FormItem>
      </Form>
    );
  }
}

FilterForm.propTypes = {
  form: PropTypes.object.isRequired,
};

const withForm = Form.create();

export default compose(withForm)(FilterForm);
