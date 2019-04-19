import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Row, Col, Divider } from 'antd';

import { productsConstants } from '../../../../../../../../../state/ducks/products';

const { productStatus } = productsConstants;

const ProductDataItem = ({
  product,
  product: {
    brand = {},
    category = {},
    metaTags = [],
    keyWords = [],
    attributes = [],
  },
}) => (
  <Fragment>
    <Row type="flex" align="middle" gutter={5}>
      <Col span={24}>
        <Divider orientation="left">Produto</Divider>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={8}>
        <span className="label term">Nome</span>
        <span className="detail">{product.name}</span>
      </Col>
      <Col span={8}>
        <span className="label term">REF</span>
        <span className="detail">{product.refProduct}</span>
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
          {metaTags.map((tag) => (
            <span key={tag} className="tags-details">{`${tag}`}</span>
          ))}
        </span>
      </Col>
      <Col span={8}>
        <span className="label term">Palavras Chave</span>
        <span className="detail">
          {keyWords.map((keyWord) => (
            <span key={keyWord} className="tags-details">
              {keyWord}
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
    <Row type="flex" gutter={24}>
      <Col span={8}>
        <span className="label term">Descrição longa</span>
        <span className="detail">{product.longDescription}</span>
      </Col>
      <Col span={8}>
        <span className="label term">Descrição curta</span>
        <span className="detail">{product.shortDescription}</span>
      </Col>
      <Col span={8}>
        <span className="label term">Status</span>
        <span className="detail">
          <span key={product.status}>
            {productStatus.map(
              (item) => item.value === product.status && item.status,
            )}
          </span>
        </span>
      </Col>
    </Row>
  </Fragment>
);

ProductDataItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductDataItem;
