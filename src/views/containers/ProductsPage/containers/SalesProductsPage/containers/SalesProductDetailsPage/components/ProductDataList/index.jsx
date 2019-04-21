import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Row, Col, Divider, Card, Avatar } from 'antd';

import { channelProductsConstants } from '../../../../../../../../../state/ducks/channelProducts';
import integrationErrorIc from '../../../../../../../../../assets/images/integration-error.svg';

import './style.less';

class ProductList extends Component {
  state = {};

  render() {
    const {
      channelProduct,
      channelProduct: {
        channelBrand = {},
        channelCategory = {},
        metaTags = [],
        keyWords = [],
        attributes = [],
      },
    } = this.props;
    const {
      channelProductStatus,
      channelProductUpdateStatus,
    } = channelProductsConstants;

    return (
      <Fragment>
        <Row type="flex" align="middle" gutter={5}>
          <Col span={24}>
            <Divider orientation="left">Produto</Divider>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <span className="label term">Nome</span>
            <span className="detail">{channelProduct.name}</span>
          </Col>
          <Col span={8}>
            <span className="label term">REF</span>
            <span className="detail">{channelProduct.refProduct}</span>
          </Col>
          <Col span={8}>
            <span className="label term">Marca</span>
            <span className="detail">{channelBrand.name}</span>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <span className="label term">Categoria</span>
            <span className="detail">{channelCategory.name}</span>
          </Col>
          <Col span={8}>
            <span className="label term">Meta Tags</span>
            <span className="detail">
              {!isEmpty(metaTags) &&
                metaTags.map((item, i) => (
                  // eslint-disable-next-line
                  <span key={i} className="tags-details">
                    {`${item}`}
                  </span>
                ))}
            </span>
          </Col>
          <Col span={8}>
            <span className="label term">Palavras Chave</span>
            <span className="detail">
              {!isEmpty(keyWords) &&
                keyWords.map((item, i) => (
                  // eslint-disable-next-line
                  <span key={i} className="tags-details">
                    {item}
                  </span>
                ))}
            </span>
          </Col>
        </Row>
        <Row type="flex" gutter={24}>
          <Col span={8}>
            <span className="label term">Status</span>
            <span className="detail">
              <span key={channelProduct.status}>
                {channelProductStatus.map(
                  (item) => item.value === channelProduct.status && item.status,
                )}
              </span>
            </span>
          </Col>
          <Col span={8}>
            <span className="label term">Descrição do Status</span>
            <span className="detail">
              <span key={channelProduct.statusDescription}>
                {channelProduct.statusDescription}
              </span>
            </span>
          </Col>
          <Col span={8}>
            <span className="label term">Status Atualização</span>
            <span className="detail">
              {channelProduct.updateStatus ? (
                <span key={channelProduct.updateStatus}>
                  {channelProductUpdateStatus.map(
                    (item) =>
                      item.value === channelProduct.updateStatus && item.status,
                  )}
                </span>
              ) : (
                '-'
              )}
            </span>
          </Col>
        </Row>
        <Row>
          {!isEmpty(attributes) &&
            attributes.map((attribute) => (
              <Col span={8} key={attribute.id}>
                <span className="label term">{attribute.description}</span>
                <span className="detail">{attribute.value}</span>
              </Col>
            ))}
        </Row>
        <Row type="flex" gutter={24}>
          <Col span={8}>
            <span className="label term">Descrição longa</span>
            <span className="detail">{channelProduct.longDescription}</span>
          </Col>
          <Col span={8}>
            <span className="label term">Descrição curta</span>
            <span className="detail">{channelProduct.shortDescription}</span>
          </Col>
        </Row>
        <Divider orientation="left">Erros na Integração</Divider>
        <Row type="flex" gutter={16}>
          <Col span={8}>
            <Card className="card-error-integration">
              <Card.Meta
                avatar={<Avatar src={integrationErrorIc} size="small" />}
                description="This is the description fshdfkj fhskfh"
              />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

ProductList.propTypes = {
  channelProduct: PropTypes.object.isRequired,
};

export default ProductList;
