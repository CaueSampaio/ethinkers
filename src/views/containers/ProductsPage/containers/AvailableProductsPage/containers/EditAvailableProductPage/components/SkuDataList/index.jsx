import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import {
  Row,
  Col,
  Collapse,
  Divider,
  Input,
  Icon,
  Form,
  Button,
  Avatar,
  notification,
  InputNumber,
} from 'antd';
import './style.less';

import {
  skusActions,
  skusSelectors,
} from '../../../../../../../../../state/ducks/skus';
import {
  productsActions,
  // productsSelectors,
} from '../../../../../../../../../state/ducks/products';

import StyledFormItem from '../../../../../../../../components/StyledFormItem';
import BadRequestNotificationBody from '../../../../../../../../components/BadRequestNotificationBody';
import SkuModalForm from '../../../../components/SkuModalForm';

const { Panel } = Collapse;

let id = 0;

class SkusDataList extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    editChannelSkusError: PropTypes.object,
    editSkuIsLoading: PropTypes.bool.isRequired,
  };

  state = {
    visibleModal: false,
  };

  showModalSku = () => {
    this.setState({
      visibleModal: true,
    });
  };

  handleCancelSkuModal = () => {
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
    const keys = form.getFieldValue('keys');

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

  handleSubmit = (e, idSku) => {
    e.preventDefault();
    const {
      actions: { editSku, findProduct },
      form: { validateFields },
      product: { id: idProduct },
      editChannelSkusError,
    } = this.props;

    validateFields(async (err, values) => {
      if (err) return;
      const result = await editSku(idSku, values);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'SKU atualizado com sucesso',
        });
        await findProduct(idProduct);
      } else {
        const { message: errorMessage, errors } = editChannelSkusError;
        notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
      }
    });
  };

  render() {
    const {
      product: { skus = [] },
      form: { getFieldDecorator, getFieldValue },
      editSkuIsLoading,
    } = this.props;
    const { visibleModal } = this.state;

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
            style={{ marginTop: 50 }}
            type="submit"
            onClick={() => this.remove(k)}
          >
            <span>Remover</span>
          </button>
        </Col>
      </Fragment>
    ));

    return (
      <Fragment>
        <Row type="flex" align="middle">
          <Col span={21}>
            <Divider orientation="left">
              <span>SKUS</span>
            </Divider>
          </Col>
          <Col span={3}>
            <Button
              className="add-sku"
              type="dashed"
              onClick={this.showModalSku}
            >
              <Icon type="plus" />
              <span>Adicionar SKU</span>
            </Button>
          </Col>
        </Row>
        {!isEmpty(skus) &&
          skus.map((sku) => (
            <Collapse key={sku.refSku} style={{ marginBottom: 20 }}>
              <Panel
                header={`${sku.description}`}
                key="1"
                extra={this.renderGenExtra()}
              >
                <Form onSubmit={(e) => this.handleSubmit(e, sku.refSku)}>
                  <Row>
                    <p className="label-gallery">Imagens:</p>
                  </Row>
                  <Row type="flex" gutter={24} align="middle">
                    {!isEmpty(sku.images) &&
                      sku.images.map((image) => (
                        <Col span={4} key={sku.images[0]}>
                          <Avatar
                            className="avatar-sku"
                            size={120}
                            icon="picture"
                            shape="square"
                            src={image}
                          />
                        </Col>
                      ))}
                  </Row>
                  <Row gutter={24}>
                    {formItemsImages}
                    <Col span={24}>
                      <Button
                        style={{ borderRadius: 30, marginTop: 10 }}
                        type="dashed"
                        onClick={this.add}
                      >
                        <Icon type="plus" />
                        <span>Adicionar imagem</span>
                      </Button>
                    </Col>
                  </Row>

                  <Row type="flex" gutter={24}>
                    <Col span={7}>
                      <StyledFormItem label="REF">
                        {getFieldDecorator('refProduct', {
                          initialValue: sku.refSku,
                          rules: [
                            {
                              required: true,
                              message: `Favor, preencher o campo REF!`,
                              whitespace: true,
                            },
                          ],
                        })(<Input />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={7}>
                      <StyledFormItem label="EAN">
                        {getFieldDecorator('ean', {
                          initialValue: sku.ean,
                          rules: [
                            {
                              required: true,
                              message: `Favor, preencher o campo EAN!`,
                              whitespace: true,
                            },
                          ],
                        })(<Input />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={10}>
                      <StyledFormItem label="Descrição">
                        {getFieldDecorator('description', {
                          initialValue: sku.description,
                          rules: [
                            {
                              required: true,
                              message: `Favor, preencher o campo Descrição!`,
                              whitespace: true,
                            },
                          ],
                        })(<Input.TextArea autosize />)}
                      </StyledFormItem>
                    </Col>
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
                        })(<InputNumber style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Peso real">
                        {getFieldDecorator('realWeight', {
                          initialValue: sku.realWeight,
                        })(<InputNumber style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Altura">
                        {getFieldDecorator('height', {
                          initialValue: sku.height,
                        })(<InputNumber style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Altura real">
                        {getFieldDecorator('realHeight', {
                          initialValue: sku.realHeight,
                        })(<InputNumber style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Largura">
                        {getFieldDecorator('width', {
                          initialValue: sku.width,
                        })(<InputNumber style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Largura real">
                        {getFieldDecorator('realWidth', {
                          initialValue: sku.realWidth,
                        })(<InputNumber style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                  </Row>
                  <Row type="flex" gutter={24}>
                    <Col span={3}>
                      <StyledFormItem label="Comprimento">
                        {getFieldDecorator('lenght', {
                          initialValue: sku.lenght,
                        })(<InputNumber style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Comprimento real">
                        {getFieldDecorator('realLenght', {
                          initialValue: sku.realLenght,
                        })(<InputNumber style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col span={3}>
                      <StyledFormItem label="Peso cúbico">
                        {getFieldDecorator('cubicWeight', {
                          initialValue: sku.cubnicWeight,
                        })(<InputNumber style={{ width: '100%' }} />)}
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
                          loading={editSkuIsLoading}
                          type="ghost"
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

        <SkuModalForm
          visible={visibleModal}
          onCancel={this.handleCancelSkuModal}
        />
      </Fragment>
    );
  }
}

const withForm = Form.create();
const mapStateToProps = createStructuredSelector({
  editSkuError: skusSelectors.makeSelectEditSkuError(),
  editSkuIsLoading: skusSelectors.makeSelectEditSkuIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...skusActions, ...productsActions }, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withForm,
  withConnect,
)(SkusDataList);
