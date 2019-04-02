import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Row, Col, Divider } from 'antd';

class ProductList extends Component {
  state = {};

  render() {
    const {
      channelProduct,
      channelProduct: {
        brand = {},
        category = {},
        metaTags = [],
        keyWords = [],
        attributes = [],
      },
    } = this.props;
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
            <span className="detail">{brand.name}</span>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <span className="label term">Categoria</span>
            <span className="detail">{category.name}</span>
          </Col>
          <Col span={8}>
            <span className="label term">Meta Tags</span>
            <span className="detail">
              {!isEmpty(metaTags) &&
                metaTags.map((item) => <span key={item}>{`${item},`}</span>)}
            </span>
          </Col>
          <Col span={8}>
            <span className="label term">Palavras Chave</span>
            <span className="detail">
              {!isEmpty(keyWords) &&
                keyWords.map((item) => (
                  <span key={item} className="detail">
                    {item}
                  </span>
                ))}
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
        <Row>
          <Col span={21}>
            <span className="label term">Descrição longa</span>
            <span className="detail">{channelProduct.longDescription}</span>
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
