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
  Button,
  Avatar,
  Divider,
  notification,
} from 'antd';

import {
  skusActions,
  skusSelectors,
} from '../../../../../../../state/ducks/skus';

import BadRequestNotificationBody from '../../../../../../components/BadRequestNotificationBody';

import './style.less';

let id = 0;
// const imagesList = [];

class SkuModalForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    createSkuError: PropTypes.object,
    createSkuIsLoading: PropTypes.bool.isRequired,
  };

  state = { previewImage: '' };

  remove = async (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    await this.setState({
      previewImage: '',
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

  handleChangeImage = (e) => {
    e.persist();

    this.setState({
      previewImage: e.target.value,
    });
  };

  handleSubmit = async () => {
    const {
      form: { validateFields },
      actions: { createSku },
      createSkuError,
      onCancel,
    } = this.props;

    validateFields(async (err, values) => {
      if (err) return;
      const result = await createSku(values);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'SKU cadastrado com sucesso',
        });
        onCancel();
      } else {
        const { message: errorMessage, errors } = createSkuError;
        notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      visible,
      onCancel,
      createSkuIsLoading,
    } = this.props;
    const { previewImage } = this.state;

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItemsImages = keys.map((k) => (
      <Fragment key={k}>
        <Col span={6}>
          <Form.Item label="URL da Imagem" required={false}>
            {getFieldDecorator(`images[${k}].url`, {
              validateTrigger: ['onChange', 'onBlur'],
            })(<Input onChange={this.handleChangeImage} />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Nome" required={false}>
            {getFieldDecorator(`images[${k}].name`, {
              validateTrigger: ['onChange', 'onBlur'],
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item label="Descrição" required={false}>
            {getFieldDecorator(`images[${k}].description`, {
              validateTrigger: ['onChange', 'onBlur'],
            })(<Input.TextArea autosize />)}
          </Form.Item>
        </Col>
        <Col span={3}>
          <button
            className="remove-image"
            type="submit"
            onClick={() => this.remove(k)}
          >
            <span>Remover</span>
          </button>
        </Col>
      </Fragment>
    ));

    return (
      <Modal
        title="Cadastrar SKU"
        width={930}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleSubmit}
        centered
        footer={[
          <Button style={{ borderRadius: 50 }} key="back" onClick={onCancel}>
            <span>Cancelar</span>
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={createSkuIsLoading}
            style={{ borderRadius: 50 }}
            onClick={this.handleSubmit}
          >
            <span>Cadastrar</span>
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleSubmit} className="add-sku-form">
          <Row type="flex" gutter={10} align="middle">
            {keys.length >= 1 ? (
              <Col span={4}>
                <Col span={24}>
                  <span className="label-avatar">VISUALIZE A IMAGEM: </span>
                </Col>
                <Col>
                  <Avatar
                    className="avatar-sku create-sku"
                    shape="square"
                    src={previewImage}
                    icon="picture"
                    size={135}
                  />
                </Col>
              </Col>
            ) : null}
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
          <Divider orientation="left">SKU</Divider>
          <Row type="flex" gutter={24}>
            <Col span={6}>
              <Form.Item label="REF">
                {getFieldDecorator('refSku', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="EAN">
                {getFieldDecorator('ean', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Descrição">
                {getFieldDecorator('description', {})(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="Preço de">
                {getFieldDecorator('priceOf', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Preço por">
                {getFieldDecorator('priceBy', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Peso">
                {getFieldDecorator('weight', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Peso real">
                {getFieldDecorator('realWeight', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Altura">
                {getFieldDecorator('height', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Altura real">
                {getFieldDecorator('realHeight', {})(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={3}>
              <Form.Item label="Largura">
                {getFieldDecorator('width', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Altura real">
                {getFieldDecorator('realHeight', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Comprimento">
                {getFieldDecorator('length', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Comprimento real">
                {getFieldDecorator('realLength', {})(<Input />)}
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
