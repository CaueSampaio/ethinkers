import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import {
  Row,
  Col,
  Divider,
  Button,
  Icon,
  Modal,
  InputNumber,
  Input,
  Form,
  Avatar,
} from 'antd';

import CurrencyFormField from '../../../../../../../../components/CurrencyFormField';

let id = 0;

class CreateSkuModal extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    skuImages: PropTypes.array.isRequired,
    handleChangeImage: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    loading: PropTypes.bool.isRequired,
    visibleModal: PropTypes.bool,
    onCancel: PropTypes.func,
  };

  state = {};

  remove = async (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  add = async () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat((id += 1));

    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  render() {
    const {
      form,
      form: { getFieldDecorator, getFieldValue },
      skuImages,
      handleChangeImage,
      onSubmit,
      loading,
      visibleModal,
      onCancel,
    } = this.props;

    getFieldDecorator('keys', { initialValue: [0] });
    const keys = getFieldValue('keys');

    const formItemsImages = keys.map((k) => (
      <Row
        type="flex"
        align="middle"
        gutter={10}
        key={k}
        className="content-sku-img"
      >
        <Col span={3}>
          <Form.Item>
            {getFieldDecorator('avatar', {})(
              <Avatar
                className="avatar-sku create-sku"
                shape="square"
                src={isEmpty(skuImages) ? '' : skuImages[k]}
                icon="picture"
                size={80}
              />,
            )}
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="URL da Imagem" required>
            {getFieldDecorator(`images[${k}].url`, {
              rules: [
                {
                  required: true,
                  message: 'Favor, preencher a imagem!',
                  whitespace: true,
                },
              ],
              validateTrigger: ['onChange', 'onBlur'],
            })(
              <Input
                maxLength={128}
                onChange={(e) => handleChangeImage(e, k)}
              />,
            )}
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="Nome" required>
            {getFieldDecorator(`images[${k}].name`, {
              rules: [
                {
                  required: true,
                  message: 'Favor, preencher o Nome!',
                  whitespace: true,
                },
              ],
              validateTrigger: ['onChange', 'onBlur'],
            })(<Input maxLength={128} />)}
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item label="Descrição" required>
            {getFieldDecorator(`images[${k}].description`, {
              rules: [
                {
                  required: true,
                  message: 'Favor, preencher Descrição!',
                  whitespace: true,
                },
              ],
              validateTrigger: ['onChange', 'onBlur'],
            })(<Input.TextArea autosize maxLength={128} />)}
          </Form.Item>
        </Col>
        {keys.length > 1 ? (
          <Col span={2}>
            <button
              className="remove-image"
              type="submit"
              onClick={() => this.remove(k)}
            >
              <span>Remover</span>
            </button>
          </Col>
        ) : null}
      </Row>
    ));

    return (
      <Fragment>
        <Modal
          title="Adicionar SKU"
          width={1000}
          visible={visibleModal}
          onCancel={onCancel}
          centered
          footer={[
            <Button style={{ borderRadius: 50 }} key="back" onClick={onCancel}>
              <span>Cancelar</span>
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              // loading={createSkuIsLoading}
              style={{ borderRadius: 50 }}
              onClick={onSubmit}
              loading={loading}
            >
              <span>Cadastrar</span>
            </Button>,
          ]}
        >
          <Form onSubmit={this.handleSubmit} className="add-sku-form">
            <Row type="flex" gutter={10} align="middle">
              <Col span={24}>
                {formItemsImages}
                <Col span={24}>
                  <Button
                    className="add-image"
                    type="dashed"
                    onClick={this.add}
                  >
                    <Icon type="plus" />
                    <span>Adicionar imagem</span>
                  </Button>
                </Col>
              </Col>
            </Row>
            <Divider orientation="left">Detalhes</Divider>
            <Row type="flex" gutter={24}>
              <Col span={6}>
                <Form.Item label="REF">
                  {getFieldDecorator('refSku', {
                    rules: [
                      {
                        required: true,
                        message: 'Favor, preencher a REF!',
                        whitespace: true,
                      },
                    ],
                  })(<Input maxLength={50} />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="EAN">
                  {getFieldDecorator('ean', {
                    rules: [
                      {
                        required: true,
                        message: 'Favor, preencher EAN!',
                        whitespace: true,
                      },
                    ],
                  })(<Input maxLength={30} minLength={5} />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <CurrencyFormField
                  form={form}
                  precision="2"
                  fieldName="priceOf"
                  label="Preço de"
                />
              </Col>
              <Col span={6}>
                <CurrencyFormField
                  form={form}
                  precision="2"
                  fieldName="priceBy"
                  label="Preço por"
                />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="Descrição">
                  {getFieldDecorator('description', {
                    rules: [
                      {
                        required: true,
                        message: 'Favor, preencher a Descrição!',
                        whitespace: true,
                      },
                    ],
                  })(<Input maxLength={200} />)}
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="left">Medidas</Divider>
            <Row type="flex" gutter={24}>
              <Col span={6}>
                <Form.Item label="Peso">
                  {getFieldDecorator('weight', {
                    rules: [
                      {
                        required: true,
                        message: 'Favor, preencher a Altura!',
                      },
                    ],
                  })(<InputNumber min={0} style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Peso real">
                  {getFieldDecorator('realWeight', {})(
                    <InputNumber min={0} style={{ width: '100%' }} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Altura">
                  {getFieldDecorator('height', {
                    rules: [
                      {
                        required: true,
                        message: 'Favor, preencher a Altura!',
                      },
                    ],
                  })(<InputNumber min={0} style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Altura real">
                  {getFieldDecorator('realHeight', {})(
                    <InputNumber min={0} style={{ width: '100%' }} />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" gutter={24}>
              <Col span={6}>
                <Form.Item label="Largura">
                  {getFieldDecorator('width', {
                    rules: [
                      {
                        required: true,
                        message: 'Favor, preencher a Largura!',
                      },
                    ],
                  })(<InputNumber min={0} style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Largura real">
                  {getFieldDecorator('realWidth', {})(
                    <InputNumber min={0} style={{ width: '100%' }} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Comprimento">
                  {getFieldDecorator('length', {
                    rules: [
                      {
                        required: true,
                        message: 'Favor, preencher a Altura!',
                      },
                    ],
                  })(<InputNumber min={0} style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Comprimento real">
                  {getFieldDecorator('realLength', {})(
                    <InputNumber min={0} style={{ width: '100%' }} />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

const withForm = Form.create();

export default compose(withForm)(CreateSkuModal);
