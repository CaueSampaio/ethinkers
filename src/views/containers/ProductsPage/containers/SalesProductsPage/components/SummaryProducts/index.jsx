import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Row, Col, Skeleton } from 'antd';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';

import './style.less';

class SummaryProducts extends Component {
  state = {};

  render() {
    const { productsSummary = [], productsSummaryIsLoading } = this.props;

    return (
      <PrivatePageSection className="summary-content">
        <Skeleton
          loading={productsSummaryIsLoading}
          active
          title={false}
          paragraph={{ rows: 3 }}
        >
          <Row type="flex" justify="center">
            <h3>Resumo dos produtos</h3>
          </Row>
          <Row
            type="flex"
            justify="center"
            gutter={10}
            className="content-status"
          >
            {!isEmpty(productsSummary.response) &&
              productsSummary.response.map(({ status, statusName, value }) => (
                <Col
                  key={status}
                  xs={12}
                  sm={8}
                  md={8}
                  lg={5}
                  xl={5}
                  className="status"
                >
                  <Row>
                    <Col>{statusName}</Col>
                  </Row>
                  <Row>
                    <Col className="quantity">{value}</Col>
                  </Row>
                </Col>
              ))}
          </Row>
        </Skeleton>
      </PrivatePageSection>
    );
  }
}

SummaryProducts.propTypes = {
  productsSummary: PropTypes.object.isRequired,
  productsSummaryIsLoading: PropTypes.bool.isRequired,
};
export default SummaryProducts;
