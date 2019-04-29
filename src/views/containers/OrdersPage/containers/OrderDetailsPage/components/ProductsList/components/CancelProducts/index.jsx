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

class CancelProducts extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: [],
      cancelModal: false,
    };
  }

  componentDidMount() {
    const { products } = this.props;
    this.setState({
      products,
    });
  }

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

  renderFooterFormButtons = () => {
    const { loading } = this.state;
    return (
      <div>
        <Button key="back" onClick={this.handleCloseCancelProducts}>
          Cancelar
        </Button>
        <Button key="submit" type="primary" loading={loading} onClick={this.handleCancelProducts}>Cancelar produtos</Button>
      </div>
    );
  };

  handleCancelProducts = () => {
    this.setState({
      loading: true,
    });
    const {
      products,
      id,
      form: { validateFields, resetFields },
      actions: { cancelOrderItems },
    } = this.props;
    const idOrderItems = this.getIdSelectedProducts(products);
    validateFields(async (err, value) => {
      if (err) return;
      const data = {
        idOrderItems,
        status: 7,
        ...value,
      };
      const result = await cancelOrderItems(id, data);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'Produtos cancelados com sucesso',
        });
        resetFields();
        this.setState({
          loading: false,
          cancelModal: false,
        });
      } else {
        notification.error({
          message: 'Desculpe, ocorreu um erro. Tente novamente.',
        });
      }
    });
  };

  showCancelProductsModal = (e) => {
    const { products } = this.props;
    const idOrderItems = this.getIdSelectedProducts(products);
    if(idOrderItems.length < 1) {
      notification.warning({
        message: 'Selecione no mínimo um produto para cancelar.',
      });
    } else {
      this.setState({
        cancelModal: true,
      });
    }
  };

  handleCloseCancelProducts = (e) => {
    const {
      form: {
        resetFields,
      },
    } = this.props;
    resetFields();
    this.setState({
      loading: false,
      cancelModal: false,
    });
  };

  getIdSelectedProducts = (products) => {
    const selectedProducts = products.filter((product) => product.isChecked);
    let productsId = [];
    selectedProducts.forEach((item) => productsId.push(item.id));
    return productsId;
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        <PrivatePageHeaderButton
          onClick={(e) => this.showCancelProductsModal()}
        >
          Cancelar produto
        </PrivatePageHeaderButton>
        <Modal
          title="Cancelar itens selecionados."
          visible={this.state.cancelModal}
          centered={true}
          onCancel={this.handleCloseCancelProducts}
          okText="Cancelar produtos"
          footer={this.renderFooterFormButtons()}
        >
          {this.renderCancelReasonForm()}
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
)(CancelProducts);
