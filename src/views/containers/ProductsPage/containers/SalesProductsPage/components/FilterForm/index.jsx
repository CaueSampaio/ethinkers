import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Row, Form, Input, Button, Select } from 'antd';

import StyledFormItem from '../../../../../../components/StyledFormItem';
import StyledButtonFilter from '../../../../../../components/StyledButtonFilter';

import './style.less';

const { Option } = Select;

class FilterForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  };

  state = {};

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const children = [];
    for (let i = 10; i < 36; i += 1) {
      children.push(
        <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>,
      );
    }

    return (
      <div className="form-filter">
        <Row type="flex" justify="space-between">
          <h3>Filtros</h3>
          <Button className="btn-clear">Limpar</Button>
        </Row>
        <Form className="form-filters" layout="vertical">
          <StyledFormItem label="Nome:">
            {getFieldDecorator('name', {})(<Input />)}
          </StyledFormItem>
          <StyledFormItem label="Marcas:">
            {getFieldDecorator('brand', {})(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                // onChange={handleChange}
              >
                {children}
              </Select>,
            )}
          </StyledFormItem>
          <StyledFormItem label="Categorias:">
            {getFieldDecorator('categories', {})(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                // onChange={handleChange}
              >
                {children}
              </Select>,
            )}
          </StyledFormItem>
          <StyledFormItem label="Canal de Venda:">
            {getFieldDecorator('categories', {})(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                // onChange={handleChange}
              >
                {children}
              </Select>,
            )}
          </StyledFormItem>
          <StyledFormItem label="Ref do Produto:">
            {getFieldDecorator('categories', {})(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                // onChange={handleChange}
              >
                {children}
              </Select>,
            )}
          </StyledFormItem>
          <StyledFormItem label="Código do produto:">
            {getFieldDecorator('categories', {})(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                // onChange={handleChange}
              >
                {children}
              </Select>,
            )}
          </StyledFormItem>
          <StyledFormItem label="Empresa fornecedora:">
            {getFieldDecorator('categories', {})(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                // onChange={handleChange}
              >
                {children}
              </Select>,
            )}
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

const withForm = Form.create();

export default compose(withForm)(FilterForm);
