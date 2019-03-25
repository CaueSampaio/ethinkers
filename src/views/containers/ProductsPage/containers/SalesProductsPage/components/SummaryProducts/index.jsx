import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';

import './style.less';

class SummaryProducts extends Component {
  state = {};

  render() {
    const { productsSummary = [] } = this.props;
    console.log(productsSummary);

    return (
      <PrivatePageSection className="summary-content">
        <Row type="flex" justify="center">
          <h3>Resumo dos produtos</h3>
        </Row>
        <Row type="flex" justify="center" gutter={24} align="middle">
          {productsSummary.map(({ status, statusName, value }) => (
            <Col key={status} span={8} className="status">
              <Row>
                <span>{statusName}</span>
              </Row>
              <Row>
                <span className="quantity">{value}</span>
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
