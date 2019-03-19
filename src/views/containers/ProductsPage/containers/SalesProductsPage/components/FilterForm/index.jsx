import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Row, Form, Input, Button, Select, Col } from 'antd';

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
          <Row gutter={24}>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
              <StyledFormItem label="Nome:">
                {getFieldDecorator('name', {})(<Input />)}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
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
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
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
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
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
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
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
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
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
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={24}>
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
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={24}>
              <StyledFormItem label="Status:">
                {getFieldDecorator('status', {})(<Input />)}
              </StyledFormItem>
            </Col>
          </Row>
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
