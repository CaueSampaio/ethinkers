/*eslint-disable*/
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Form,
  Input,
  Card,
  Row,
  Col,
  Button,
  Icon,
  Spin,
  Modal,
  notification,
} from 'antd';
import { isEmpty } from 'lodash';
import { getHeaderResourceName } from '../../../../../utils';
import { formatCurrency } from '../../../../../utils/masks/formatCurrency';
import {
  ordersActions,
  ordersSelectors,
} from '../../../../../state/ducks/orders';

import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PrivatePageSection from '../../../../components/PrivatePageSection';
import PrivatePageHeaderButton from '../../../../components/PrivatePageHeaderButton';
import ProductsList from './components/ProductsList';
import InvoiceList from './components/InvoiceList';

import { Animated } from 'react-animated-css';

import './style.less';

let i = 0;

const { confirm } = Modal;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class OrderDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
      slide: true,
      orderModal: false,
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    orders: PropTypes.object,
    form: PropTypes.object.isRequired,
  };

  state = {};

  componentWillMount() {
    const {
      match: {
        params: { id },
      },
      actions: { findOrder },
    } = this.props;
    findOrder(id).then((response) => {
      const { payload } = response;
      this.setState({
        order: payload,
      });
    });
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      actions: { findOrder, listOrders },
    } = this.props;
    // findOrder(id);
    listOrders();
  }

  renderResourceMap = () => {
    const consumer = { name: 'oi', id: '123' };

    return [getHeaderResourceName(consumer, 'name', 'id')];
  };

  prevItem() {
    this.setState({
      slide: false,
    });
    const {
      orders,
      actions: { findOrder },
      history: { push },
    } = this.props;
    if (i === 0) {
      i = orders.results.length;
    }
    i -= 1;
    findOrder(orders.results[i].orderNumber).then((response) => {
      this.setState({
        slide: true,
        order: response.payload,
      });
    });
    push(`./${orders.results[i].orderNumber}`);
    return orders.results[i];
  }

  nextItem() {
    this.setState({
      slide: false,
    });
    const {
      orders,
      actions: { findOrder },
      history: { push },
    } = this.props;
    i += 1;
    i %= orders.results.length;
    findOrder(orders.results[i].orderNumber).then((response) => {
      this.setState({
        slide: true,
        order: response.payload,
      });
    });
    push(`./${orders.results[i].orderNumber}`);
    return orders.results[i];
  }

  renderInvoiceOrderForm = () => {
    console.log('LOOKTHEPROPS', this.props);
    const {
      form: {
        getFieldDecorator,
        getFieldsError,
        getFIeldError,
        isFieldTouched,
      },
    } = this.props;

    const numberError = isFieldTouched('number') && getFIeldError('userName');
    return (
      <div>
        <Form layout="inline">
          <Form.Item
            validateStatus={numberError ? 'error' : ''}
            help={numberError || ''}
          />
          {getFieldDecorator('number', {
            rules: [{ required: true, message: 'Por favor insira um numero.' }],
          })(<Input />)}
        </Form>
      </div>
    );
  };

  showInvoiceOrderModal = (event, order) => {
    const {
      actions: { invoiceOrder },
      editStatusError,
    } = this.props;
    const data = {
      idOrder: '',
      number: '',
      series: '',
      key: '',
      tracking: {
        code: '',
        url: '',
      },
    };
    this.setState({
      orderModal: !this.state.orderModal,
    });

    confirm({
      title: 'Para faturar o pedido, insira os dados:',
      okText: 'Confirmar',
      content: this.renderInvoiceOrderForm(),
      onOk: async () => {
        const result = await invoiceOrder(data);
        if (!result.error) {
          await notification.success({
            message: 'Sucesso',
            description: 'Pedido faturado com sucesso',
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

  showConfirmCancelOrder = (event) => {
    const {
      match: {
        params: { id },
      },
      actions: { cancelOrder },
      editStatusError,
    } = this.props;
    const data = {
      status: 4,
    };

    confirm({
      title: 'Deseja realmente cancelar o pedido?',
      okText: 'Confirmar',
      content: 'Este pedido sera cancelado.',
      onOk: async () => {
        const result = await cancelOrder(id, data);
        if (!result.error) {
          await notification.success({
            message: 'Sucesso',
            description: 'Pedido cancelado com sucesso',
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

  renderOrderNumberStatus = (orderNumber, status, channel) => {
    const {
      order,
      form: {
        getFieldDecorator,
        getFieldsError,
        getFIeldError,
        isFieldTouched,
      },
    } = this.props;
    return (
      <div>
        <Row>
          <div className="order-number">
            #{orderNumber} <span>({status})</span>
          </div>
          <h2>{channel.name}</h2>
        </Row>
        <Row className="order-actions" type="flex">
          <PrivatePageHeaderButton
            onClick={(e) => this.showConfirmInvoiceOrder(e, order)}
          >
            Faturar
          </PrivatePageHeaderButton>
          <Modal
            title="Faturar pedido"
            visible={this.state.orderModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          <PrivatePageHeaderButton
            onClick={(e) => this.showConfirmCancelOrder(e, order)}
          >
            Cancelar
          </PrivatePageHeaderButton>
        </Row>
      </div>
    );
  };

  render() {
    const {
      slide,
      order: {
        channel,
        customer,
        delivery,
        payment,
        orderItems,
        orderNumber,
        status,
        invoices,
      },
    } = this.state;
    const {
      actions: {
        trackSkus,
      }
    } = this.props;
    return (
      <Fragment>
        {!isEmpty(channel) ? (
          <PrivatePageHeader
            title="Detalhes do Pedido"
            content={this.renderOrderNumberStatus(orderNumber, status, channel)}
            resourceMap={this.renderResourceMap()}
          />
        ) : null}

        <Row type="flex" justify="center">
          {isEmpty(orderItems) ? (
            <Spin indicator={antIcon} tip="Carregando" />
          ) : null}
        </Row>
        {orderItems ? (
          <Animated
            animationIn="zoomIn"
            animationOut="zoomOut"
            isVisible={slide}
          >
            <PrivatePageSection className="content-client-data">
              <Row type="flex" gutter={24} justify="space-around">
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                  <Card className="card-order-data">
                    <h3>Cliente</h3>
                    <Row gutter={24} className="personal-info">
                      <Col xs={24} sm={24} md={8} lg={8} xl={24}>
                        <span className="label-info">Nome: </span>
                        <span>{!isEmpty(customer) && customer.firstName}</span>
                        <span> </span>
                        <span>{!isEmpty(customer) && customer.lastName}</span>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={24}>
                        <span className="label-info">CPF: </span>
                        <span>{!isEmpty(customer) && customer.cpf}</span>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={24}>
                        <span className="label-info">Telefone: </span>
                        <span>{!isEmpty(customer) && customer.firstPhone}</span>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                  <Card className="card-order-data">
                    <h3>Endereço</h3>
                    <Row type="flex" className="address-info" gutter={5}>
                      <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                        <span className="label-info">Logradouro: </span>
                        <span>{!isEmpty(delivery) && delivery[0].street}</span>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                        <span className="label-info">Número: </span>
                        <span>{!isEmpty(delivery) && delivery[0].number}</span>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                        <span className="label-info">Complemento: </span>
                        <span>
                          {!isEmpty(delivery) && delivery[0].complement}
                        </span>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                        <span className="label-info">Cidade: </span>
                        <span>{!isEmpty(delivery) && delivery[0].city}</span>
                      </Col>
                      <Col span={24}>
                        <span className="label-info">Estado: </span>
                        <span>{!isEmpty(delivery) && delivery[0].state}</span>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                  <article className="payment-data">
                    <h3>Pagamento</h3>
                    <p className="payment-status">Aprovado</p>
                    <Row className="payment-method">
                      <span>Método de Pagamento</span>
                      <p>
                        Cartão de
                        <span> </span>
                        {!isEmpty(payment) && payment.paymentType}
                      </p>
                    </Row>
                    <Row className="prices">
                      <Col>
                        <span className="freight-label">Frete:</span>
                        <span>
                          {' '}
                          {!isEmpty(payment) &&
                            formatCurrency(payment.paidValue)}
                        </span>
                      </Col>
                      <span className="total-label">Valor total: </span>
                      <span className="total-value">
                        {!isEmpty(payment) && formatCurrency(payment.paidValue)}
                      </span>
                    </Row>
                  </article>
                </Col>
              </Row>
            </PrivatePageSection>
            <Row
              type="flex"
              gutter={16}
              justify="space-between"
              className="antd-pro-components-setting-drawer-index-handle btn-paginate"
              align="middle"
              style={{ top: 400, width: '100%', marginLeft: 1 }}
            >
              <Button className="btn-prev" onClick={() => this.prevItem()}>
                <Icon type="left" />
              </Button>
              <Button className="btn-next" onClick={() => this.nextItem()}>
                <Icon type="right" />
              </Button>
            </Row>
            {invoices ? (
              <InvoiceList invoiceList={invoices} products={orderItems} trackSkus={trackSkus} />
            ) : null}
            {orderItems ? (
              <ProductsList props={this.props} products={orderItems} />
            ) : null}
          </Animated>
        ) : null}
      </Fragment>
    );
  }
}

const withForm = Form.create();

const mapStateToProps = createStructuredSelector({
  orders: ordersSelectors.makeSelectOrders(),

  order: ordersSelectors.makeSelectFindOrder(),
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
  withForm,
  withConnect,
)(OrderDetailsPage);
