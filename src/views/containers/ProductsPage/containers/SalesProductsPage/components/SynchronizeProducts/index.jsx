import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Divider } from 'antd';
import { isEmpty } from 'lodash';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';

import './style.less';

class SynchronizeProducts extends Component {
  static propTypes = {
    selectedProducts: PropTypes.array,
  };

  state = {};

  render() {
    const { selectedProducts } = this.props;
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
                {isEmpty(selectedProducts) ? (
                  <Row type="flex" align="middle">
                    <Col span={24}>
                      <span className="synchronize-description">
                        OU SINCRONIZE UM OU MAIS PRODUTOS
                      </span>
                    </Col>
                    <Col className="sub-description" span={24} offset={2}>
                      <span>NENHUM PRODUTO SELECIONADO AINDA</span>
                    </Col>
                  </Row>
                ) : (
                  <Row type="flex" align="middle">
                    <Col span={2}>
                      <span className="selected-amount">
                        {selectedProducts.length}
                      </span>
                    </Col>
                    <Col span={2}>
                      <span className="label-selected">
                        Produto(s) Selecionado(s)
                      </span>
                    </Col>
                    <Col offset={7}>
                      <Button className="btn-synchronize">Sincronizar</Button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </PrivatePageSection>
    );
  }
}

export default SynchronizeProducts;
