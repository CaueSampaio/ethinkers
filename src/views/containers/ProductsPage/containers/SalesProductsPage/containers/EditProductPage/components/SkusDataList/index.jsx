import React, { Component } from 'react';
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
  Select,
  notification,
  InputNumber,
} from 'antd';
import CurrencyFormField from '../../../../../../../../components/CurrencyFormField';

import {
  channelSkusActions,
  channelSkusSelectors,
} from '../../../../../../../../../state/ducks/channelSkus';
import {
  channelProductsActions,
  // channelProductsSelectors,
} from '../../../../../../../../../state/ducks/channelProducts';

import EditSkuModal from '../EditSkuModal';
import StyledFormItem from '../../../../../../../../components/StyledFormItem';
import BadRequestNotificationBody from '../../../../../../../../components/BadRequestNotificationBody';

import './style.less';

const { Panel } = Collapse;

let id = 0;

class SkusDataList extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    categoriesAttributes: PropTypes.array,
    editChannelSkusError: PropTypes.object,
    editChannelSkusIsLoading: PropTypes.bool.isRequired,
  };

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
    const keys = form.getFieldValue('keys');

    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  add = () => {
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
      actions: { editChannelSkus, findChannelProduct },
      form: { validateFields },
      product: { idProduct },
      editChannelSkusError,
    } = this.props;

    validateFields(async (err, values) => {
      if (err) return;
      const result = await editChannelSkus(idSku, values);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'SKU atualizado com sucesso',
        });
        await findChannelProduct(idProduct);
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
      product,
      product: { skus = [] },
      form,
      form: { getFieldDecorator },
      categoriesAttributes,
      editChannelSkusIsLoading,
    } = this.props;
    const { visibleModal } = this.state;

    getFieldDecorator('keys', { initialValue: [] });

    return (
      <div className="content-collapse-sku">
        <Row>
          <Divider orientation="left">SKUS</Divider>
        </Row>
        {!isEmpty(skus) &&
          skus.map((sku) => (
            <Collapse key={sku.refSku} style={{ marginBottom: 20 }}>
              <Panel
                header={sku.description}
                key="1"
                extra={this.renderGenExtra()}
              >
                <Form onSubmit={(e) => this.handleSubmit(e, sku.refSku)}>
                  <Row>
                    <Col span={24}>
                      <p className="label-gallery">Imagens</p>
                    </Col>
                  </Row>
                  <Row type="flex" gutter={24} align="middle">
                    {!isEmpty(sku.images) &&
                      sku.images.map((image) => (
                        <Col
                          xs={24}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                          key={image}
                          className="gallery-container"
                        >
                          <Avatar
                            size={120}
                            shape="square"
                            src={sku.images[0]}
                          />
                        </Col>
                      ))}
                  </Row>
                  <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
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
                        })(<Input.TextArea autosize maxLength={200} />)}
                      </StyledFormItem>
                    </Col>
                    {!isEmpty(sku.attributes) &&
                      sku.attributes.map((attribute, i) => (
                        <Col
                          xs={24}
                          sm={24}
                          md={24}
                          lg={8}
                          xl={8}
                          key={attribute.id}
                        >
                          <StyledFormItem label="Atributo 01">
                            {getFieldDecorator(`attributes[${i}]`, {
                              initialValue: attribute.value,
                            })(<Input />)}
                          </StyledFormItem>
                        </Col>
                      ))}
                    {!isEmpty(categoriesAttributes) &&
                      categoriesAttributes.map(
                        (
                          { id: idItem, values, type, required, description },
                          i,
                        ) =>
                          type === 1 && (
                            <Col
                              xs={24}
                              sm={24}
                              md={24}
                              lg={8}
                              xl={8}
                              key={idItem}
                            >
                              <Form.Item label={description}>
                                {getFieldDecorator(
                                  `attributes[${i}]`,
                                  required
                                    ? {
                                        rules: [
                                          {
                                            required: true,
                                            message: `Favor, preencher o campo ${description}!`,
                                            whitespace: true,
                                          },
                                        ],
                                      }
                                    : {},
                                )(
                                  !isEmpty(values) ? (
                                    <Select>
                                      {values.map((value) => (
                                        <Select.Option key={value.id}>
                                          {value.description}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                  ) : (
                                    <Input />
                                  ),
                                )}
                              </Form.Item>
                            </Col>
                          ),
                      )}
                  </Row>
                  <Row type="flex" gutter={24}>
                    <Col xs={24} sm={12} md={6} lg={6} xl={3}>
                      <CurrencyFormField
                        form={form}
                        precision="2"
                        fieldName="priceOf"
                        label="Preço de"
                        initialValue={sku.priceOf}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6} xl={3}>
                      <CurrencyFormField
                        form={form}
                        precision="2"
                        fieldName="priceBy"
                        label="Preço por"
                        initialValue={sku.priceBy}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Peso">
                        {getFieldDecorator('weight', {
                          initialValue: sku.weight,
                          rules: [
                            {
                              required: true,
                              message: 'Favor, preencher o campo Peso',
                            },
                          ],
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Peso real">
                        {getFieldDecorator('realWeight', {
                          initialValue: sku.realWeight,
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Altura">
                        {getFieldDecorator('height', {
                          initialValue: sku.height,
                          rules: [
                            {
                              required: true,
                              message: 'Favor, preencher o campo Altura',
                            },
                          ],
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Altura real">
                        {getFieldDecorator('realHeight', {
                          initialValue: sku.realHeight,
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Largura">
                        {getFieldDecorator('width', {
                          initialValue: sku.width,
                          rules: [
                            {
                              required: true,
                              message: 'Favor, preencher o campo Largura!',
                            },
                          ],
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Largura real">
                        {getFieldDecorator('realWidth', {
                          initialValue: sku.realWidth,
                        })(<InputNumber style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                  </Row>
                  <Row type="flex" gutter={24}>
                    <Col xs={24} sm={12} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Comprimento">
                        {getFieldDecorator('lenght', {
                          initialValue: sku.lenght,
                          rules: [
                            {
                              required: true,
                              message: 'Favor, preencher o campo Comprimento',
                            },
                          ],
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Comprimento real">
                        {getFieldDecorator('realLenght', {
                          initialValue: sku.realLenght,
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Peso cúbico">
                        {getFieldDecorator('cubicWeight', {
                          initialValue: sku.cubnicWeight,
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
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
                          loading={editChannelSkusIsLoading}
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
        <EditSkuModal
          product={product}
          visible={visibleModal}
          onCancel={this.handleCancelEdit}
        />
      </div>
    );
  }
}

const withForm = Form.create();
const mapStateToProps = createStructuredSelector({
  editChannelSkusError: channelSkusSelectors.makeSelectEditSkuError(),
  editChannelSkusIsLoading: channelSkusSelectors.makeSelectEditChannelSkuIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { ...channelSkusActions, ...channelProductsActions },
    dispatch,
  ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withForm,
  withConnect,
)(SkusDataList);
