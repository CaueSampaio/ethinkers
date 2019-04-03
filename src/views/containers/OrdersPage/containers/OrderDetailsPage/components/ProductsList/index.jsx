/* eslint-disable */
import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  List,
  Checkbox,
  Modal,
  notification,
  Form,
  Input,
} from 'antd';
import { isEmpty } from 'lodash';
import { compose } from 'redux';
import PrivatePageHeaderButton from '../../../../../../components/PrivatePageHeaderButton';
import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import CheckBox from '../CheckBox';

import './style.less';
import { consoleTestResultHandler } from 'tslint/lib/test';

const { confirm } = Modal;

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      invoiceModal: false,
      cancelModal: false,
    };
  }

  componentDidMount() {
    const { products } = this.props;
    this.setState({
      products,
    });
  }

  renderTitle = (item) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        whiteSpace: 'normal',
      }}
    >
      {item.channelSku.description}
    </div>
  );

  renderAvatar = (item) => (
    <div style={{ display: 'flex' }}>
      <CheckBox
        handleCheckChieldElement={this.handleCheckChieldElement}
        {...item}
      />
      <img
        alt="Image"
        src={item.channelSku.images[0].url}
        style={{ marginLeft: 8 }}
      />
    </div>
  );

  renderNetValue = (item) => (
    <div style={{ display: 'flex' }}>
      <span>{item.netValue}}</span>
    </div>
  );

  renderDescription = (item) => (
    <div className="product-description">
      <h3>
        Quantidade: <span>{item.quantity}</span>
      </h3>
      <h3>
        Preço: <span>{item.netValue}</span>
      </h3>
      <h3>
        SKU: <span>{item.channelSku.refSku}</span>
      </h3>
      <h3>
        Status: <span>{item.status}</span>
      </h3>
    </div>
  );

  handleAllChecked = (event) => {
    let { products } = this.state;
    products.forEach((product) => (product.isChecked = event.target.checked));
    this.setState({ products: products });
  };

  handleCheckChieldElement = (event) => {
    let { products } = this.state;
    products.forEach((product) => {
      if (product.Id == event.target.value)
        product.isChecked = event.target.checked;
    });
    this.setState({ products: products });
  };

  showConfirmCancelOrderItems = (event, products) => {
    const {
      match: {
        params: { id },
      },
      actions: { cancelOrderItems },
      editStatusError,
    } = this.props.props;
    const selectedProducts = this.getIdSelectedProducts(products);
    const data = {
      idOrderItens: selectedProducts,
      status: 4,
      reason: 'Cancelado pelo usuário',
    };

    confirm({
      title: 'Deseja realmente cancelar os itens selecionados?',
      okText: 'Confirmar',
      content: this.renderCancelReasonForm(),
      onOk: async () => {
        const result = await cancelOrderItems(id, data);
        if (!result.error) {
          await notification.success({
            message: 'Sucesso',
            description: 'Itens cancelados com sucesso',
          });
        } else {
          const { message: errorMessage, errors } = editStatusError;
          notification.error({
            message: errorMessage,
            description: <BadRequestNotificationBody errors={errors} />,
          });
        }
      },
    });
  };

  renderCancelReasonForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div>
        <Form>
          <Form.Item label="Motivo">
            {getFieldDecorator('reason', {
              rules: [
                {
                  required: true,
                  message: 'Motivo é um campo obrigatório.',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Form>
      </div>
    );
  };

  renderInvoiceProductsForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div>
        <Form>
          <Form.Item label="Number">
            {getFieldDecorator('number', {
              rules: [
                {
                  required: true,
                  message: 'Number é um campo obrigatório.',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Series">
            {getFieldDecorator('series', {
              rules: [
                { required: true, message: 'Series é um campo obrigatório.' },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Key">
            {getFieldDecorator('key', {
              rules: [
                { required: true, message: 'Keys é um campo obrigatório.' },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Código de rastreio">
            {getFieldDecorator('tracking.code', {})(<Input />)}
          </Form.Item>
          <Form.Item label="Url">
            {getFieldDecorator('tracking.url', {})(<Input />)}
          </Form.Item>
        </Form>
      </div>
    );
  };

  handleInvoiceProducts = () => {
    const products = this.getIdSelectedProducts(products);
    const {
      order,
      match: {
        params: { id },
      },
      actions: { invoiceOrder },
    } = this.props.props;
    let data = {
      idOrder: id,
      number: order.number,
      idOrderItems: products,
    };
    const {
      form: { validateFields, resetFields },
    } = this.props;
    validateFields(async (err, value) => {
      if (err) return;
      data = {
        idOrder: id,
        ...data,
        ...value,
      };
      const result = await invoiceOrder(data);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'Produtos faturados com sucesso',
        });
        this.handleCancel();
        resetFields();
      } else {
        const { message: errorMessage, errors } = editStatusError;
        notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
      }
    });
    this.setState({
      invoiceModal: false,
    });
  };

  handleCancelProducts = () => {
    const products = this.getIdSelectedProducts(products);
    const {
      match: {
        params: { id },
      },
      actions: { cancelOrderItems },
    } = this.props.props;
    let data = {
      status: 4,
      idOrderItems: products,
    };
    const {
      form: { validateFields, resetFields },
    } = this.props;
    validateFields(async (err, value) => {
      if (err) return;
      data = {
        ...data,
        ...value,
      };
      const result = await cancelOrderItems(id, data);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'Produtos cancelados com sucesso',
        });
        this.handleCancel();
        resetFields();
      } else {
        const { message: errorMessage, errors } = editStatusError;
        notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
      }
    });
    this.setState({
      invoiceModal: false,
    });
  };

  showInvoiceProductsModal = (e) => {
    this.setState({
      invoiceModal: true,
    });
  };

  handleCloseInvoiceProducts = (e) => {
    this.setState({
      invoiceModal: false,
    });
  };

  showCancelProductsModal = (e) => {
    this.setState({
      cancelModal: true,
    });
  };

  handleCloseCancelProducts = (e) => {
    this.setState({
      cancelModal: false,
    });
  };

  getIdSelectedProducts = () => {
    const { products } = this.state;
    const selectedProducts = products.filter((product) => product.isChecked);
    let productsId = [];
    selectedProducts.forEach((item) => productsId.push(item.Id));
    return productsId;
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        <PrivatePageSection>
          <h3>Produtos</h3>
          <Row type="flex">
            <PrivatePageHeaderButton
              onClick={(e) => this.showInvoiceProductsModal(e)}
            >
              Faturar SKUS
            </PrivatePageHeaderButton>
            <Modal
              title="Faturar produtos selecionados."
              visible={this.state.invoiceModal}
              onOk={() => this.handleInvoiceProducts()}
              onCancel={this.handleCloseInvoiceProducts}
              centered={true}
              okText="Faturar produtos"
            >
              {this.renderInvoiceProductsForm()}
            </Modal>
            <PrivatePageHeaderButton
              onClick={(e) => this.showCancelProductsModal()}
            >
              Cancelar produto
            </PrivatePageHeaderButton>
            <Modal
              title="Cancelar itens selecionados."
              visible={this.state.cancelModal}
              onOk={() => this.handleCancelProducts()}
              onCancel={this.handleCloseCancelProducts}
              centered={true}
              okText="Cancelar produtos"
            >
            {this.renderCancelReasonForm()}
            </Modal>
          </Row>
          <Row>
            <Col className="space-bottom">
              <Checkbox onClick={this.handleAllChecked} value="checkedall">
                Selecionar todos
              </Checkbox>
            </Col>
          </Row>
          <List
            rowKey="id"
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={[...products]}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Card hoverable className="card">
                  <Card.Meta
                    avatar={this.renderAvatar(item)}
                    title={this.renderTitle(item)}
                    description={this.renderDescription(item)}
                  />
                </Card>
              </List.Item>
            )}
          />
        </PrivatePageSection>
      </div>
    );
  }
}

const withForm = Form.create();

export default compose(withForm)(ProductList);
