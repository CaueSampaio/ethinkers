import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import { Row, Col, Collapse, Divider, Input, Icon, Form, Button } from 'antd';

import EditSkuModal from '../EditSkuModal';
import StyledFormItem from '../../../../../../../../components/StyledFormItem';

const { Panel } = Collapse;

let id = 0;

class SkusDataList extends Component {
  state = { visibleModal: false };

  showModalEdit = (event) => {
    event.stopPropagation();

    this.setState({
      visibleModal: true,
    });
  };

  handleCancelEdit = () => {
    this.setState({
      visibleModal: false,
    });
  };

  renderGenExtra = () => (
    <div>
      <Icon type="edit" style={{ marginRight: 8, fontSize: 17 }} />
      <span>Editar</span>
    </div>
  );

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat((id += 1));
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;

    validateFields(async (err, values) => {
      console.log(values);
    });
  };

  render() {
    const {
      product,
      product: { skus = [] },
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { visibleModal } = this.state;

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItemsImages = keys.map((k) => (
      <Col span={8} key={k}>
        <Form.Item label="URL da Imagem" required={false}>
          {getFieldDecorator(`images[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
          })(<Input style={{ width: '90%' }} />)}

          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            style={{ marginLeft: 5 }}
            onClick={() => this.remove(k)}
          />
        </Form.Item>
      </Col>
    ));

    return (
      <Fragment>
        <Row>
          <Divider orientation="left">SKUS</Divider>
        </Row>
        {!isEmpty(skus) &&
          skus.map((sku) => (
            <Collapse key={sku.refSku} style={{ marginBottom: 20 }}>
              <Panel
                header={`REF: ${sku.refSku}`}
                key="1"
                extra={this.renderGenExtra()}
              >
                <Form>
                  <Row type="flex" gutter={24} align="middle">
                    {!isEmpty(sku.images) &&
                      sku.images.map((image, i) => (
                        <Col span={8} key={sku.images[i]}>
                          <StyledFormItem label="URL da Imagem">
                            {getFieldDecorator(`image[${i}]`, {
                              initialValue: `${image}`,
                            })(<Input />)}
                          </StyledFormItem>
                        </Col>
                      ))}
                    {formItemsImages}
                    <Col span={6}>
                      <Button
                        style={{ borderRadius: 50, marginTop: 10 }}
                        type="dashed"
                        onClick={this.add}
                      >
                        <Icon type="plus" />
                        <span>Adicionar imagem</span>
                      </Button>
                    </Col>
                  </Row>
                  <Row type="flex" gutter={24}>
                    <Col span={12}>
                      <StyledFormItem label="Descrição">
                        {getFieldDecorator('description', {
                          initialValue: sku.description,
                        })(<Input.TextArea autosize />)}
                      </StyledFormItem>
                    </Col>
                    {!isEmpty(sku.attributes) &&
                      sku.attributes.map((attribute, i) => (
                        <Col span={12} key={attribute.id}>
                          <StyledFormItem label="Atributo 01">
                            {getFieldDecorator(`attributes[${i}]`, {
                              initialValue: attribute.value,
                            })(<Input />)}
                          </StyledFormItem>
                        </Col>
                      ))}
                  </Row>
                  <Row type="flex" gutter={24}>
                    <Col span={3}>
                      <StyledFormItem label="Preço de">
                        {getFieldDecorator('priceOf', {
                          initialValue: sku.priceOf,
                        })(<Input />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Preço por">
                        {getFieldDecorator('priceBy', {
                          initialValue: sku.priceOf,
                        })(<Input />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Peso">
                        {getFieldDecorator('weight', {
                          initialValue: sku.weight,
                        })(<Input />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Peso real">
                        {getFieldDecorator('realWeight', {
                          initialValue: sku.realWeight,
                        })(<Input />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Altura">
                        {getFieldDecorator('height', {
                          initialValue: sku.height,
                        })(<Input />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Altura real">
                        {getFieldDecorator('realHeight', {
                          initialValue: sku.realHeight,
                        })(<Input />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Largura">
                        {getFieldDecorator('width', {
                          initialValue: sku.width,
                        })(<Input />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Largura real">
                        {getFieldDecorator('realWidth', {
                          initialValue: sku.realWidth,
                        })(<Input />)}
                      </StyledFormItem>
                    </Col>
                  </Row>
                  <Row type="flex" gutter={24}>
                    <Col span={3}>
                      <StyledFormItem label="Comprimento">
                        {getFieldDecorator('lenght', {
                          initialValue: sku.lenght,
                        })(<Input />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Comprimento real">
                        {getFieldDecorator('realLenght', {
                          initialValue: sku.realLenght,
                        })(<Input />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Peso cúbico">
                        {getFieldDecorator('cubicWeight', {
                          initialValue: sku.cubnicWeight,
                        })(<Input />)}
                      </StyledFormItem>
                    </Col>
                  </Row>
                  <Row type="flex" justify="end">
                    <Col>
                      <StyledFormItem>
                        <Button
                          style={{
                            borderRadius: 50,
                            border: '2px solid #1464B4',
                            color: '#1464B4',
                          }}
                          type="ghost"
                          onClick={this.handleSubmit}
                          htmlType="submit"
                        >
                          <span>Atualizar SKU</span>
                        </Button>
                      </StyledFormItem>
                    </Col>
                  </Row>
                </Form>
              </Panel>
            </Collapse>
          ))}
        <EditSkuModal
          product={product}
          visible={visibleModal}
          onCancel={this.handleCancelEdit}
        />
      </Fragment>
    );
  }
}

SkusDataList.propTypes = {
  product: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const withForm = Form.create();

export default compose(withForm)(SkusDataList);
