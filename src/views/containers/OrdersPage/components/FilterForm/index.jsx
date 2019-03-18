import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form, Input, InputNumber, Button, Row } from 'antd';

import StyledFormItem from '../../../../components/StyledFormItem';
import StyledButtonFilter from '../../../../components/StyledButtonFilter';

import './style.less';

class FilterForm extends Component {
  state = {};

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className="form-filter">
        <Row type="flex" justify="space-between">
          <h3>Filtros</h3>
          <Button className="btn-clear">Limpar</Button>
        </Row>
        <Form layout="vertical">
          <StyledFormItem label="Código:">
            {getFieldDecorator('number', {})(
              <InputNumber style={{ width: '100%' }} />,
            )}
          </StyledFormItem>
          <StyledFormItem label="CPF:">
            {getFieldDecorator('cpf', {})(<Input />)}
          </StyledFormItem>
          <StyledFormItem label="Nome do Cliente:">
            {getFieldDecorator('name', {})(<Input />)}
          </StyledFormItem>
          <StyledFormItem label="Canal de venda:">
            {getFieldDecorator('canal', {})(<Input />)}
          </StyledFormItem>
          <StyledFormItem label="Status:">
            {getFieldDecorator('status', {})(<Input />)}
          </StyledFormItem>
          <Form.Item>
            <StyledButtonFilter text="Buscar" />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

FilterForm.propTypes = {
  form: PropTypes.object.isRequired,
};

const withForm = Form.create();

export default compose(withForm)(FilterForm);
