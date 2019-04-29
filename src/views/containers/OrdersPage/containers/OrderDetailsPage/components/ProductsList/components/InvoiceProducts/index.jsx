/* eslint-disable */
import React, { Component } from 'react';
import { Modal, Form, Input, Button, notification, DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/pt_BR';
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
    const dateFormat = 'DD/MM/YYYY';
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
                { required: true, message: 'Series é um campo obrigatório e deve ter de 1 a 2 caracteres.' },
              ],
            })(<Input minLength={1} maxLength={2} />)}
          </Form.Item>
          <Form.Item label="Key">
            {getFieldDecorator('key', {
              rules: [
                { required: true, message: 'Key é um campo obrigatório e deve ter 44 caracteres.' },
              ],
            })(<Input minLength={44} maxLength={44} />)}
          </Form.Item>
          <Form.Item label="Issuance Date">
            {getFieldDecorator('issuanceDate', {
              rules: [{ required: true, message: 'Por favor insira uma data.' }],
            })(<DatePicker placeholder="" format={dateFormat} locale={locale} />)}
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
        notification.error({
          message: 'Desculpe ocorreu um erro, tente novamente.',
        });
      }
    });
  };

  showInvoiceProductsModal = () => {
    const { products } = this.props;
    const idOrderItems = this.getIdSelectedProducts(products);
    if(idOrderItems.length < 1) {
      notification.warning({
        message: 'Selecione no mínimo um produto para faturar.',
      });
    } else {
      this.setState({
        invoiceModal: true,
      });
    }
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
