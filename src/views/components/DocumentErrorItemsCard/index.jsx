import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Card, Avatar, Row, Col } from 'antd';

import documentErrorScreen from '../../../assets/images/document-error.svg';

import './style.less';

const { Meta } = Card;

const DocumentErrorItemsCard = ({ errors }) => (
  <div className="content-errors">
    <Row>
      <Col>
        <h3>Houve erro durante o Upload do arquivo :(</h3>
      </Col>
    </Row>
    <Row type="flex" gutter={16}>
      {!isEmpty(errors) &&
        errors.map((error) => (
          <Col span={12} key={error.propertyName}>
            <Card size="small" style={{ marginTop: 10 }} bordered>
              <Meta
                avatar={
                  <Avatar shape="square" size={50} src={documentErrorScreen} />
                }
                title={
                  <span className="error-doc-title">{error.propertyName}</span>
                }
                description={
                  !isEmpty(error.errorsMessage) &&
                  error.errorsMessage.map((message) => (
                    <Row key={message}>{message}</Row>
                  ))
                }
              />
            </Card>
          </Col>
        ))}
    </Row>
  </div>
);

DocumentErrorItemsCard.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default DocumentErrorItemsCard;
