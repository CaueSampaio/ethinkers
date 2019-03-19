import React, { Component, Fragment } from 'react';
import { Card, Row, Col } from 'antd';

import { getHeaderResourceName } from '../../../../../utils';

import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PrivatePageSection from '../../../../components/PrivatePageSection';
import ProductsList from './components/ProductsList';

import './style.less';

class OrderDetailsPage extends Component {
  state = {};

  renderResourceMap = () => {
    const consumer = { name: 'oi', id: '123' };

    return [getHeaderResourceName(consumer, 'name', 'id')];
  };

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
                <span>oioi</span>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <Card className="card-order-data">
                <h3>Endereço</h3>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={16} xl={8}>
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
        <ProductsList />
      </Fragment>
    );
  }
}

export default OrderDetailsPage;
