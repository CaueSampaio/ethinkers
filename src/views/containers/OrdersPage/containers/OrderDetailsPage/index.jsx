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
  DatePicker,
} from 'antd';
import locale from 'antd/lib/date-picker/locale/pt_BR';
import { isEmpty } from 'lodash';
import { Animated } from 'react-animated-css';
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

import './style.less';
import { forEachChild } from 'typescript';

let i = 0;
let ordersConcat = [];

const { confirm } = Modal;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class OrderDetailsPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      invoiceLoading: false,
      order: props.order,
      slide: {
        isLoadingRight: false,
        isLoadingLeft: false,
        active: true,
        gettingIn: 'fadeIn',
        gettingOut: 'fadeOut',
      },
      orderModal: false,
    };
  }

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
      actions: { listOrders },
    } = this.props;
    // findOrder(id);
    listOrders().then((response) => {
      ordersConcat = response.payload;
    });
  }

  renderResourceMap = () => {
    const { order } = this.props;

    return [getHeaderResourceName(order, 'orderNumber', 'id')];
  };

  renderFooterFormButtons = () => {
    const { invoiceLoading } = this.state;
    return (
      <div>
        <Button key="back" onClick={this.handleCloseInvoiceOrderModal}>
          Cancelar
        </Button>
        <Button
          key="submit"
          type="primary"
          loading={invoiceLoading}
          onClick={this.handleInvoiceOrder}
        >
          Faturar pedido
        </Button>
      </div>
    );
  };

  showConfirmCancelOrder = () => {
    const {
      match: {
        params: { id },
      },
      actions: { cancelOrder },
      editStatusError,
    } = this.props;
    const data = {
      status: 7,
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
            description: <div {...errors} />,
          });
        }
      },
    });
  };

  handleCloseInvoiceOrderModal = () => {
    const {
      form: { resetFields },
    } = this.props;
    resetFields();
    this.setState({
      invoiceLoading: false,
      orderModal: false,
    });
  };

  handleInvoiceOrder = () => {
    this.setState({
      invoiceLoading: true,
    });
    const {
      match: {
        params: { id },
      },
      actions: { invoiceOrder },
    } = this.props;
    const {
      form: { validateFields, resetFields },
    } = this.props;
    validateFields(async (err, value) => {
      if (err) return;
      const data = {
        idOrder: id,
        ...value,
      };
      const result = await invoiceOrder(data);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'Pedido faturado com sucesso',
        });
        this.setState({
          invoiceLoading: false,
          orderModal: false,
        });
        resetFields();
      }
    });
  };

  showInvoiceOrderModal = () => {
    this.setState({
      orderModal: true,
    });
  };

  renderInvoiceOrderForm = () => {
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
                { required: true, message: 'Por favor insira um number.' },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Series">
            {getFieldDecorator('series', {
              rules: [
                {
                  required: true,
                  message:
                    'Series é um campo obrigatório e deve ter de 1 a 2 caracteres.',
                },
              ],
            })(<Input Input minLength={1} maxLength={2} />)}
          </Form.Item>
          <Form.Item label="Key">
            {getFieldDecorator('key', {
              rules: [
                {
                  required: true,
                  message:
                    'Keys é um campo obrigatório e deve ter 44 caracteres.',
                },
              ],
            })(<Input minLength={44} maxLength={44} />)}
          </Form.Item>
          <Form.Item label="Issuance Date">
            {getFieldDecorator('issuanceDate', {
              rules: [
                { required: true, message: 'Por favor insira uma data.' },
              ],
            })(
              <DatePicker placeholder="" format={dateFormat} locale={locale} />,
            )}
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

  nextItem = async () => {
    this.setState({
      slide: {
        isLoadingRight: true,
      },
    });
    const {
      order,
      orders,
      orders: { results },
      actions: { findOrder, listOrders },
      history: { push },
    } = this.props;
    i = ordersConcat.results.findIndex((item) => item.id === order.id);
    if (i == results.length - 1) {
      const params = { lastId: results[i].id };
      await listOrders(params).then((response) => {
        const { payload } = response;
        payload.results.forEach((order) => {
          ordersConcat.results.push(order);
        });
      });
    }
    i += 1;
    findOrder(ordersConcat.results[i].id).then((response) => {
      this.setState({
        slide: {
          active: false,
          gettingOut: 'slideOutLeft',
          gettingIn: 'slideInRight',
        },
      });
      this.setState({
        slide: {
          isLoadingRight: false,
          active: true,
        },
        order: response.payload,
      });
    });
    push(`./${ordersConcat.results[i].id}`);
    return ordersConcat.results[i];
  }

  prevItem() {
    this.setState({
      slide: {
        isLoadingLeft: true,
      },
    });
    const {
      order,
      orders,
      orders: { results },
      actions: { findOrder },
      history: { push },
    } = this.props;
    i = ordersConcat.results.findIndex((item) => item.id === order.id);
    if (i === 0) {
      i = ordersConcat.results.length;
      notification.warning({
        message: 'Este é o primeiro pedido.',
      });
      this.setState({
        slide: {
          isLoadingLeft: false,
        },
      });
    } else {
      i -= 1;
      console.log(i);
      findOrder(ordersConcat.results[i].id).then((response) => {
        this.setState({
          slide: {
            active: false,
            gettingOut: 'slideOutLeft',
            gettingIn: 'slideInLeft',
          },
        });
        this.setState({
          slide: {
            isLoadingLeft: false,
            active: true,
          },
          order: response.payload,
        });
      });
      push(`./${ordersConcat.results[i].id}`);
      return ordersConcat.results[i];
    }
  }

  renderOrderNumberStatus = (orderNumber, status, channel) => {
    const { order } = this.props;
    const { orderModal } = this.state;
    return (
      <div>
        <Row>
          <div className="order-number">
            #{orderNumber}
            <span>({status})</span>
          </div>
          <h2>{channel.name}</h2>
        </Row>
        <Row className="order-actions" type="flex">
          <PrivatePageHeaderButton
            onClick={(e) => this.showInvoiceOrderModal(e, order)}
          >
            Faturar
          </PrivatePageHeaderButton>
          <PrivatePageHeaderButton
            onClick={(e) => this.showConfirmCancelOrder(e, order)}
          >
            Cancelar
          </PrivatePageHeaderButton>
        </Row>
        <Modal
          title="Faturar pedido"
          visible={orderModal}
          footer={this.renderFooterFormButtons()}
          onCancel={this.handleCloseInvoiceOrderModal}
        >
          {this.renderInvoiceOrderForm()}
        </Modal>
      </div>
    );
  };

  render() {
    const {
      order,
      slide: { isLoadingRight, isLoadingLeft, active, gettingIn, gettingOut },
      order: {
        channel,
        customer,
        delivery,
        payment,
        orderItems,
        orderNumber,
        status,
        invoices,
        ...rest
      },
    } = this.state;
    const {
      actions: { trackSkus },
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
          {isEmpty(order) ? (
            <Spin indicator={antIcon} tip="Carregando" />
          ) : null}
        </Row>
        {orderItems ? (
          <Animated
            animationIn={gettingIn}
            animationOut={gettingOut}
            isVisible={active}
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
                      {payment.map((payment) => (
                        <p>{!isEmpty(payment) && payment.paymentType}</p>
                      ))}
                    </Row>
                    <Row className="prices">
                      <Col>
                        <span className="freight-label">Frete:</span>
                        <span>
                          {' '}
                          {!isEmpty(payment) &&
                            formatCurrency(payment[0].paidValue)}
                        </span>
                      </Col>
                      <span className="total-label">Valor total: </span>
                      <span className="total-value">
                        {!isEmpty(order) && formatCurrency(order.totalNetValue)}
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
              <Button
                className="btn-prev"
                loading={isLoadingLeft}
                onClick={() => this.prevItem()}
              >
                {!isLoadingLeft ? <Icon type="left" /> : null}
              </Button>
              <Button
                className="btn-next"
                loading={isLoadingRight}
                onClick={() => this.nextItem()}
              >
                {!isLoadingRight ? <Icon type="right" /> : null}
              </Button>
            </Row>
            {invoices ? (
              <InvoiceList
                invoiceList={invoices}
                orderItems={orderItems}
                trackSkus={trackSkus}
              />
            ) : null}
            {orderItems ? (
              <ProductsList products={orderItems} {...rest} />
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
