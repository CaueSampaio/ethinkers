import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';

import './style.less';

class SummaryProducts extends Component {
  state = {};

  render() {
    const { productsSummary = [] } = this.props;

    return (
      <PrivatePageSection className="summary-content">
        <Row type="flex" justify="center">
          <h3>Resumo dos produtos</h3>
        </Row>
        <Row type="flex" justify="center" gutter={10}>
          {productsSummary.map(({ status, statusName, value }) => (
            <Col key={status} span={5} className="status">
              <Row>
                <Col>{statusName}</Col>
              </Row>
              <Row>
                <Col className="quantity">{value}</Col>
              </Row>
            </Col>
          ))}
        </Row>
      </PrivatePageSection>
    );
  }
}

SummaryProducts.propTypes = {
  productsSummary: PropTypes.array.isRequired,
};
export default SummaryProducts;
