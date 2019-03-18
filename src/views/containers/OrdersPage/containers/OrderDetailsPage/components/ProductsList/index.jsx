import React, { Component } from 'react';
import { Row, Col, Card, Checkbox } from 'antd';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';

class ProductList extends Component {
  state = {};

  render() {
    return (
      <div>
        <PrivatePageSection>
          <h3>Produtos</h3>
          <Row>actions</Row>
          <Row type="flex" gutter={24}>
            <Col span={9}>
              <Card>
                <Row type="flex" justify="space-between" gutter={16}>
                  <Col span={20}>
                    <Checkbox />
                    <img alt="product" />
                  </Col>
                  <Col span={4}>
                    <span>categoria</span>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </PrivatePageSection>
      </div>
    );
  }
}

export default ProductList;
