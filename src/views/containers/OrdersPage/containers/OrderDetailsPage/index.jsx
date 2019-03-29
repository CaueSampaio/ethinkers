/*eslint-disable*/
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Card, Row, Col, Button, Icon, Spin } from 'antd';
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

import { Animated } from 'react-animated-css';

import './style.less';

let i = 0;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class OrderDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
      slide: true,
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    orders: PropTypes.object,
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
    console.log(orders.results[i]);
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
    console.log('order-resukts', orders.results[i]);
    push(`./${orders.results[i].orderNumber}`);
    return orders.results[i];
  }

  renderOrderNumberStatus = (orderNumber, status) => (
    <div>
      <Row type="flex">
        <div className="order-number">
          #{orderNumber} <span>({status})</span>
        </div>
      </Row>
      <Row className="order-actions" type="flex">
        <PrivatePageHeaderButton>Faturar</PrivatePageHeaderButton>
        <PrivatePageHeaderButton>Cancelar</PrivatePageHeaderButton>
      </Row>
    </div>
  );

  render() {
    const {
      slide,
      order: { customer, delivery, payment, orderItems, orderNumber, status },
    } = this.state;

    return (
      <Fragment>
        <PrivatePageHeader
          title="Detalhes do Pedido"
          content={this.renderOrderNumberStatus(orderNumber, status)}
          resourceMap={this.renderResourceMap()}
        />

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
                        <span>
                          {!isEmpty(delivery) && delivery.address.street}
                        </span>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                        <span className="label-info">Número: </span>
                        <span>
                          {!isEmpty(delivery) && delivery.address.number}
                        </span>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                        <span className="label-info">Complemento: </span>
                        <span>
                          {!isEmpty(delivery) && delivery.address.complement}
                        </span>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                        <span className="label-info">Cidade: </span>
                        <span>
                          {!isEmpty(delivery) && delivery.address.city}
                        </span>
                      </Col>
                      <Col span={24}>
                        <span className="label-info">Estado: </span>
                        <span>
                          {!isEmpty(delivery) && delivery.address.state}
                        </span>
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
            {orderItems ? <ProductsList products={orderItems} /> : null}
          </Animated>
        ) : null}
      </Fragment>
    );
  }
}

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

export default compose(withConnect)(OrderDetailsPage);
