/* eslint-disable */
import React, { Component } from 'react';
import { Row, Col, Card, List, Checkbox } from 'antd';
import { isEmpty } from 'lodash';

import PrivatePageHeaderButton from '../../../../../../components/PrivatePageHeaderButton';
import PrivatePageSection from '../../../../../../components/PrivatePageSection';

import './style.less';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
    };
  }

  renderTitle = (item) => (
    <div style={{ display: 'flex', justifyContent: 'space-between',  whiteSpace: 'normal' }}>
      {item.channelSku.description}
    </div>
  );

  renderAvatar = (item) => (
    <div style={{ display: 'flex' }}>
      <Checkbox />
      <img alt="" src={item.channelSku.images[0]} style={{ marginLeft: 8 }} />
    </div>
  );

  renderNetValue = (item) => (
    <div style={{ display: 'flex' }}>
      <span>{item.netValue}}</span>
    </div>
  );

  renderDescription = (item) => (
    <div className="product-description">
      <h3>Quantidade: <span>{item.quantity}</span></h3>
      <h3>Preço: <span>{item.netValue}</span></h3>
      <h3>SKU: <span>{item.channelSku.refSku}</span></h3>
      <h3>Status: <span>{item.status}</span></h3>
    </div>
  );

  render() {
    const { products } = this.props;
    console.log('render', products);
    return (
      <div>
        <PrivatePageSection>
          <h3>Produtos</h3>
          <Row type="flex">
            <PrivatePageHeaderButton>Faturar SKUS</PrivatePageHeaderButton>
            <PrivatePageHeaderButton>
              Enviar tracking dos SKUS
            </PrivatePageHeaderButton>
            <PrivatePageHeaderButton>Cancelar produto</PrivatePageHeaderButton>
          </Row>
          <Row>
            <Col className="space-bottom">
              <Checkbox>Selecionar todos</Checkbox>
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

export default ProductList;
