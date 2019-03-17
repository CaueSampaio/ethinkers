import React, { Component } from 'react';
import { Row, Col } from 'antd';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';

import './style.less';

class SummaryProducts extends Component {
  state = {};

  render() {
    return (
      <PrivatePageSection className="summary-content">
        <Row type="flex" justify="center">
          <h3>Resumo dos produtos</h3>
        </Row>
        <Row type="flex" justify="center" gutter={16}>
          <Col className="status" span={3}>
            <Row>
              <span className="label-status">Curado</span>
            </Row>
            <Row>
              <span className="quantity">01</span>
            </Row>
          </Col>
          <Col className="status" span={3}>
            <Row>
              <span className="label-status">Curado </span>
            </Row>
            <Row>
              <span className="quantity">01</span>
            </Row>
          </Col>
          <Col className="status" span={3}>
            <Row>
              <span className="label-status">Curado</span>
            </Row>
            <Row>
              <span className="quantity">01</span>
            </Row>
          </Col>
        </Row>
      </PrivatePageSection>
    );
  }
}

export default SummaryProducts;
