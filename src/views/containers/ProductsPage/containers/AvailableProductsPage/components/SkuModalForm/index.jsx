import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Modal,
  Form,
  Col,
  Row,
  Icon,
  Input,
  InputNumber,
  Button,
  Avatar,
  Divider,
  // notification,
} from 'antd';

import {
  skusActions,
  skusSelectors,
} from '../../../../../../../state/ducks/skus';

// import BadRequestNotificationBody from '../../../../../../components/BadRequestNotificationBody';
import CurrencyFormField from '../../../../../../components/CurrencyFormField';
import './style.less';

let id = 0;
// const imagesList = [];

class SkuModalForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmitSku: PropTypes.func,
    createSkuIsLoading: PropTypes.bool.isRequired,
  };

  state = { skuImages: [] };

  remove = async (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    if (keys.length === 1) {
      return;
    }

    await this.setState({
      // previewImage: '',
    });

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

  handleChangeImage = async (e, k) => {
    e.persist();
    const { skuImages } = this.state;
    // setar a url na mesma posicao do input
    await this.setState((prevState) => ({
      skuImages: [
        { ...prevState.skuImages, [k]: e.target.value }, // eslint-disable-line
      ],
    }));
    console.log(skuImages);
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      visible,
      onCancel,
      createSkuIsLoading,
      onSubmitSku,
      form,
    } = this.props;
    const { skuImages } = this.state;

    getFieldDecorator('keys', { initialValue: [0] });
    const keys = getFieldValue('keys');
    console.log(skuImages);

    const formItemsImages = keys.map((k) => (
      <Fragment key={k}>
        <Row type="flex" align="middle" gutter={16}>
          <Col span={2}>
            <Avatar
              // className="avatar-sku create-sku"
              shape="square"
              src={skuImages[k]}
              icon="picture"
            />
          </Col>
          <Col span={4}>
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
              })(<Input onChange={(e) => this.handleChangeImage(e, k)} />)}
            </Form.Item>
          </Col>
          <Col span={4}>
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
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={6}>
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
              })(<Input.TextArea autosize />)}
            </Form.Item>
          </Col>
          {keys.length > 1 ? (
            <Col span={3}>
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
      </Fragment>
    ));

    return (
      <Modal
        title="Adicionar SKU"
        width={930}
        visible={visible}
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
            loading={createSkuIsLoading}
            style={{ borderRadius: 50 }}
            onClick={onSubmitSku}
          >
            <span>Adicionar</span>
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleSubmit} className="add-sku-form">
          <Row type="flex" gutter={10} align="middle">
            <Col span={20}>
              {formItemsImages}
              <Col span={24}>
                <Button className="add-image" type="dashed" onClick={this.add}>
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
                })(<Input />)}
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
                })(<Input />)}
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
                })(<Input />)}
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
                })(<InputNumber style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Peso real">
                {getFieldDecorator('realWeight', {})(
                  <InputNumber style={{ width: '100%' }} />,
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
                })(<InputNumber style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Altura real">
                {getFieldDecorator('realHeight', {})(
                  <InputNumber style={{ width: '100%' }} />,
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
                })(<InputNumber style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Largura real">
                {getFieldDecorator('realWidth', {})(
                  <InputNumber style={{ width: '100%' }} />,
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
                })(<InputNumber style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Comprimento real">
                {getFieldDecorator('realLength', {})(
                  <InputNumber style={{ width: '100%' }} />,
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  createdSku: skusSelectors.makeSelectCreateSku(),
  createSkuIsLoading: skusSelectors.makeSelectCreateSkuIsLoading(),
  createSkuError: skusSelectors.makeSelectCreateSkuError(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...skusActions,
    },
    dispatch,
  ),
});

const withForm = Form.create();
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withForm,
  withConnect,
)(SkuModalForm);
