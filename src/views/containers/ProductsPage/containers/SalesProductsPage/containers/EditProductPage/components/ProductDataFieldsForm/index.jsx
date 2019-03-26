import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form, Divider, Row, Col, Input, Select } from 'antd';

import SkusFieldsForm from '../SkusFieldsForm';

import './style.less';

const { TextArea } = Input;

class EditProductPage extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
  };

  state = {};

  render() {
    const {
      product,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Fragment>
        <Divider orientation="left">Dados do Produto</Divider>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Nome">
              {getFieldDecorator('name', {})(<Input />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Código">
              {getFieldDecorator('idProduct', {})(<Input />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Ref">
              {getFieldDecorator('refProduct', {})(<Input />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Marca">
              {getFieldDecorator('brand', {})(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Descrição Longa">
              {getFieldDecorator('longDescription', {})(
                <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Descrição curta">
              {getFieldDecorator('shortDescription', {})(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} className="input-multiple-product">
          <Col span={8}>
            <Form.Item label="Meta tags">
              {getFieldDecorator('metaTags', {})(
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  // onChange={handleChange}
                  tokenSeparators={[',']}
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Palavras Chave">
              {getFieldDecorator('keyWords', {})(
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  // onChange={handleChange}
                  tokenSeparators={[',']}
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Categoria">
              {getFieldDecorator('category', {})(
                <Select
                  style={{ width: '100%' }}
                  // onChange={handleChange}
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <SkusFieldsForm product={product} />
      </Fragment>
    );
  }
}

const withForm = Form.create({
  mapPropsToFields(props) {
    const {
      product = {},
      product: { brand = {}, category = {} },
    } = props;

    return {
      name: Form.createFormField({ value: product.name }),
      idProduct: Form.createFormField({ value: product.idProduct }),
      refProduct: Form.createFormField({ value: product.refProduct }),
      brand: Form.createFormField({ value: brand.name }),
      longDescription: Form.createFormField({ value: product.longDescription }),
      shortDescription: Form.createFormField({
        value: product.shortDescription,
      }),
      metaTags: Form.createFormField({ value: product.metaTags }),
      keyWords: Form.createFormField({ value: product.keyWords }),
      category: Form.createFormField({ value: category.name }),
    };
  },
});

export default compose(withForm)(EditProductPage);
