import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import {
  Row,
  Col,
  Collapse,
  Input,
  Icon,
  Form,
  Button,
  Avatar,
  InputNumber,
} from 'antd';
import './style.less';

import CurrencyFormField from '../../../../../../../../components/CurrencyFormField';

import StyledFormItem from '../../../../../../../../components/StyledFormItem';
import SkuModalForm from '../../../../components/SkuModalForm';

const { Panel } = Collapse;

let id = 0;

class SkusDataList extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    editSkuIsLoading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
  };

  state = {
    visibleModal: false,
    skuImages: [],
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

  getFormRef = (ref) => {
    this.skuForm = ref;
  };

  handleChangeImageSku = async (e, k) => {
    e.persist();
    const { skuImages } = this.state;
    const newItems = [...skuImages];

    newItems[k] = e.target.value;
    await this.setState({ skuImages: newItems });
  };

  render() {
    const {
      product: { skus = [] },
      form,
      form: { getFieldDecorator, getFieldValue },
      editSkuIsLoading,
      onSubmit,
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
            })(<Input maxLength={128} onChange={this.handleChangeImage} />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Nome" required={false}>
            {getFieldDecorator(`images[${k}].name`, {
              validateTrigger: ['onChange', 'onBlur'],
            })(<Input maxLength={128} />)}
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item label="Descrição" required={false}>
            {getFieldDecorator(`images[${k}].description`, {
              validateTrigger: ['onChange', 'onBlur'],
            })(<Input.TextArea maxLength={128} autosize />)}
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
        {!isEmpty(skus) &&
          skus.map((sku) => (
            <Collapse
              key={sku.refSku}
              style={{ marginBottom: 20 }}
              className="content-collapse-sku"
            >
              <Panel
                header={`${sku.description}`}
                key="1"
                extra={this.renderGenExtra()}
              >
                <Form onSubmit={(e) => onSubmit(e, sku.refSku)}>
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
                    <Col xs={24} sm={24} md={12} lg={12} xl={7}>
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
                        })(<Input maxLength={200} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={7}>
                      <StyledFormItem label="EAN">
                        {getFieldDecorator('ean', {
                          initialValue: sku.ean,
                          rules: [
                            {
                              required: true,
                              message: `Favor, preencher o campo EAN!`,
                              whitespace: true,
                            },
                            {
                              min: 5,
                              max: 30,
                              message: 'Deve conter de 5 a 30 caracteres',
                            },
                          ],
                        })(<Input minLength={5} maxLength={30} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={10}>
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
                        })(<Input.TextArea maxLength={200} autosize />)}
                      </StyledFormItem>
                    </Col>
                  </Row>
                  <Row type="flex" gutter={24}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={3}>
                      <CurrencyFormField
                        form={form}
                        precision="2"
                        fieldName="priceOf"
                        label="Preço de"
                        initialValue={sku.priceOf}
                        min={0}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={3}>
                      <CurrencyFormField
                        form={form}
                        precision="2"
                        fieldName="priceBy"
                        label="Preço por"
                        initialValue={sku.priceBy}
                        min={0}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Peso">
                        {getFieldDecorator('weight', {
                          initialValue: sku.weight,
                          rules: [
                            {
                              required: true,
                              message: `Favor, preencher o campo Peso!`,
                            },
                          ],
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Peso real">
                        {getFieldDecorator('realWeight', {
                          initialValue: sku.realWeight,
                        })(<InputNumber style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Altura">
                        {getFieldDecorator('height', {
                          initialValue: sku.height,
                          rules: [
                            {
                              required: true,
                              message: `Favor, preencher o campo Altura!`,
                            },
                          ],
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Altura real">
                        {getFieldDecorator('realHeight', {
                          initialValue: sku.realHeight,
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Largura">
                        {getFieldDecorator('width', {
                          initialValue: sku.width,
                          rules: [
                            {
                              required: true,
                              message: `Favor, preencher o campo Largura!`,
                            },
                          ],
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Largura real">
                        {getFieldDecorator('realWidth', {
                          initialValue: sku.realWidth,
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                  </Row>
                  <Row type="flex" gutter={24}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Comprimento">
                        {getFieldDecorator('lenght', {
                          initialValue: sku.lenght,
                          rules: [
                            {
                              required: true,
                              message: `Favor, preencher o campo Comprimento!`,
                            },
                          ],
                        })(<InputNumber min={0} style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={3}>
                      <StyledFormItem label="Comprimento real">
                        {getFieldDecorator('realLenght', {
                          initialValue: sku.realLenght,
                        })(<InputNumber style={{ width: '100%' }} />)}
                      </StyledFormItem>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={3}>
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
          ref={this.getFormRef}
          handleChangeImage={this.handleChangeImageSku}
        />
      </Fragment>
    );
  }
}

const withForm = Form.create();

export default compose(withForm)(SkusDataList);
