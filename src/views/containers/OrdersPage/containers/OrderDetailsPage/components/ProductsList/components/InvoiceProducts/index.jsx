/* eslint-disable */
import React, { Component } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  ordersActions,
  ordersSelectors,
} from '../../../../../../../../../state/ducks/orders';

import PrivatePageHeaderButton from '../../../../../../../../components/PrivatePageHeaderButton';

import './style.less';

class InvoiceProducts extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: [],
      invoiceModal: false,
    };
  }

  componentDidMount() {
    const { products } = this.props;
    this.setState({
      products,
    });
  }

  renderFooterFormButtons = () => {
    const { loading } = this.state;
    return (
      <div>
        <Button key="back" onClick={this.handleCloseInvoiceProducts}>
          Cancelar
        </Button>
        <Button key="submit" type="primary" loading={loading} onClick={this.handleInvoiceProducts}>Faturar produtos</Button>
      </div>
    );
  };

  renderInvoiceProductsForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className="invoice-form">
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
    this.setState({
      loading: true,
    });
    const {
      products,
      id,
      form: { validateFields, resetFields },
      actions: { invoiceOrder },
    } = this.props;
    const idOrderItems = this.getIdSelectedProducts(products);
    validateFields(async (err, value) => {
      if (err) return;
      const data = {
				idOrderItems,
				idOrder: id,
        ...value,
      };
      const result = await invoiceOrder(data);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'Produtos faturados com sucesso',
        });
        resetFields();
        this.setState({
          loading: false,
          invoiceModal: false,
        });
      } else {
        const { message: errorMessage, errors } = editStatusError;
        notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
      }
    });
  };

  showInvoiceProductsModal = (products) => {
    this.setState({
      products,
      invoiceModal: true,
    });
  };

  handleCloseInvoiceProducts = (e) => {
    const { 
      form: {
        resetFields 
      }
    } = this.props;
    resetFields();
    this.setState({
      loading: false,
      invoiceModal: false,
    });
  };

  getIdSelectedProducts = (products) => {
    const selectedProducts = products.filter((product) => product.isChecked);
    let productsId = [];
    selectedProducts.forEach((item) => productsId.push(item.id));
    return productsId;
  };

  render() {
    return (
      <div>
        <PrivatePageHeaderButton onClick={this.showInvoiceProductsModal}>
          Faturar SKUS
        </PrivatePageHeaderButton>
        <Modal
          title="Faturar produtos selecionados."
          visible={this.state.invoiceModal}
          onCancel={this.handleCloseInvoiceProducts}
          centered={true}
          okText="Faturar produtos"
          footer={this.renderFooterFormButtons()}
        >
          {this.renderInvoiceProductsForm()}
        </Modal>
      </div>
    );
  }
}

const withForm = Form.create();

const mapStateToProps = createStructuredSelector({
  isLoading: ordersSelectors.makeSelectFindOrderIsLoading(),
  error: ordersSelectors.makeSelectOrdersError(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ordersActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withForm,
)(InvoiceProducts);
