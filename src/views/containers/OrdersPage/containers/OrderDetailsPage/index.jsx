import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Card, Row, Col, Button, Icon } from 'antd';

import { getHeaderResourceName } from '../../../../../utils';
import {
  ordersActions,
  ordersSelectors,
} from '../../../../../state/ducks/orders';

import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PrivatePageSection from '../../../../components/PrivatePageSection';
import ProductsList from './components/ProductsList';

import './style.less';

let i = 0;
const products = [
  { name: 'oi 1', id: '1' },
  { name: 'oi 2', id: '2' },
  { name: 'oi 3', id: '3' },
];

class OrderDetailsPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {};

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      actions: { findOrder },
    } = this.props;
    findOrder(id);
  }

  renderResourceMap = () => {
    const consumer = { name: 'oi', id: '123' };

    return [getHeaderResourceName(consumer, 'name', 'id')];
  };

  prevItem() {
    if (i === 0) {
      i = products.length;
    }
    i -= 1;
    return products[i];
  }

  nextItem() {
    const {
      history: { push },
    } = this.props;
    i += 1;
    i %= products.length;
    console.log(products[i]);
    push(`./${products[i].id}`);

    return products[i];
  }

  render() {
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
                    <span>Gustavo de Gois</span>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={24}>
                    <span className="label-info">CPF: </span>
                    <span>72355420041</span>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={24}>
                    <span className="label-info">Telefone: </span>
                    <span>12345-6789</span>
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
                    <span>Alameda dos Maracatins</span>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                    <span className="label-info">Número: </span>
                    <span>123456789</span>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                    <span className="label-info">Complemento: </span>
                    <span>Prédio, Bloco A</span>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                    <span className="label-info">Cidade: </span>
                    <span>São Paulo</span>
                  </Col>
                  <Col span={24}>
                    <span className="label-info">Estado: </span>
                    <span>SP</span>
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
                  <p>Cartão de Crédito</p>
                </Row>
                <Row className="prices">
                  <Col>
                    <span className="freight-label">Frete:</span>
                    <span> R$7,00</span>
                  </Col>
                  <span className="total-label">Valor total: </span>
                  <span className="total-value">R$ 857,00</span>
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
  data: ordersSelectors.makeSelectFindOrder(),
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
