import React, { Component } from 'react';
import { Row, Col, Button, Divider } from 'antd';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';

import './style.less';

class SynchronizeProducts extends Component {
  state = {};

  render() {
    return (
      <PrivatePageSection className="synchronize-container">
        <Row type="flex" justify="center" align="middle">
          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
            <Row type="flex" justify="center">
              <Col>
                <span className="amount-total">100&ensp;</span>
                <span className="label-amount">Produtos encontrados</span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Button className="btn-synchronize-all">Sincronizar todos</Button>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={2}>
            <Divider type="vertical" className="divider" />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
            <Row type="flex" align="middle" justify="center" gutter={16}>
              <Col>
                <Row type="flex" align="middle">
                  <Col>
                    <span className="selected-amount">01 &ensp;</span>
                  </Col>
                  <Col span={2}>
                    <span className="label-selected">Produto Selecionado</span>
                  </Col>
                  <Col offset={6}>
                    <Button className="btn-synchronize">Sincronizar</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </PrivatePageSection>
    );
  }
}

export default SynchronizeProducts;
