/*eslint-disable*/
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Card, Row, Col, Button, Icon } from 'antd';
import { isEmpty } from 'lodash';
import { getHeaderResourceName } from '../../../../../utils';
import { formatCurrency } from '../../../../../utils/masks/formatCurrency';
import {
  ordersActions,
  ordersSelectors,
} from '../../../../../state/ducks/orders';

import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PrivatePageSection from '../../../../components/PrivatePageSection';
import ProductsList from './components/ProductsList';

import './style.less';

let i = 0;

class OrderDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
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
      this.setState({
        order: response.payload,
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
        order: response.payload,
      });
    });
    console.log(orders.results[i]);
    push(`./${orders.results[i].orderNumber}`);
    return orders.results[i];
  }

  nextItem() {
    const {
      orders,
      actions: { findOrder },
      history: { push },
    } = this.props;
    i += 1;
    i %= orders.results.length;
    findOrder(orders.results[i].orderNumber).then((response) => {
      this.setState({
        order: response.payload,
      });
    });
    console.log('order-resukts', orders.results[i]);
    push(`./${orders.results[i].orderNumber}`);
    return orders.results[i];
  }

  render() {
    let {
      order: { customer, delivery, payment },
    } = this.state;
    console.log(this.state);
    return (
      <Fragment>
        <PrivatePageHeader
          title="Detalhes do Pedido"
          resourceMap={this.renderResourceMap()}
        />
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
                    <span>{!isEmpty(delivery) && delivery.address.street}</span>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                    <span className="label-info">Número: </span>
                    <span>{!isEmpty(delivery) && delivery.address.number}</span>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                    <span className="label-info">Complemento: </span>
                    <span>
                      {!isEmpty(delivery) && delivery.address.complement}
                    </span>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                    <span className="label-info">Cidade: </span>
                    <span>{!isEmpty(delivery) && delivery.address.city}</span>
                  </Col>
                  <Col span={24}>
                    <span className="label-info">Estado: </span>
                    <span>{!isEmpty(delivery) && delivery.address.state}</span>
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
                      {!isEmpty(payment) && formatCurrency(payment.paidValue)}
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
        <ProductsList />
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
