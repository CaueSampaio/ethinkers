import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Row, Col, Collapse, Avatar, Divider } from 'antd';

import { formatCurrency } from '../../../../../utils/masks/formatCurrency';

import './style.less';

const { Panel } = Collapse;

const SkuDataItem = ({ product: { skus = [], attributes = [] } }) => (
  <Fragment>
    <Divider orientation="left">SKUS</Divider>
    {!isEmpty(skus) &&
      skus.map((sku) => (
        <Collapse key={sku.refSku} style={{ marginTop: 15 }}>
          <Panel header={sku.description}>
            <Row type="flex" gutter={5} align="middle">
              <Col span={24}>
                <p className="label-gallery">IMAGENS:</p>
              </Col>
              {!isEmpty(sku.images) &&
                sku.images.map((image) => (
                  <Col span={3} key={image} className="gallery-container">
                    <Avatar
                      size={120}
                      shape="square"
                      src={image}
                      className="avatar-sku"
                      icon="picture"
                    />
                  </Col>
                ))}
            </Row>
            <Row gutter={16} style={{ marginTop: 40 }}>
              <Col span={24}>
                <p className="label-gallery">DETALHES</p>
              </Col>
              <Col span={6}>
                <span className="label term">REF</span>
                <span className="detail">{sku.refSku}</span>
              </Col>
              <Col span={6}>
                <span className="label term">EAN</span>
                <span className="detail">{sku.ean}</span>
              </Col>
            </Row>
            <Row type="flex" gutter={16}>
              <Col span={6}>
                <span className="label term">Preço de</span>
                <span className="detail">{formatCurrency(sku.priceOf)}</span>
              </Col>
              <Col span={6}>
                <span className="label term">Preço por</span>
                <span className="detail">{formatCurrency(sku.priceBy)}</span>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <span className="label term">Descrição</span>
                <span className="detail">{sku.description}</span>
              </Col>
            </Row>
            <Row gutter={16}>
              {!isEmpty(attributes) &&
                attributes.map((attribute) => (
                  <Col span={12} key={attribute.id}>
                    <span className="label term">{attribute.description}</span>
                    <span className="detail">{attribute.value}</span>
                  </Col>
                ))}
            </Row>
            <p style={{ marginTop: 10 }} className="label-gallery">
              <span> Medidas</span>
            </p>
            <Row gutter={16}>
              <Col span={3}>
                <span className="label term">Peso</span>
                <span className="detail">{sku.weight}</span>
              </Col>
              {!isEmpty(sku.realWeight) && (
                <Col span={3}>
                  <span className="label term">Peso real</span>
                  <span className="detail">{sku.realWeight}</span>
                </Col>
              )}
              <Col span={3}>
                <span className="label term">Altura</span>
                <span className="detail">{sku.height}</span>
              </Col>
              {!isEmpty(sku.realHeight) && (
                <Col span={3}>
                  <span className="label term">Altura real</span>
                  <span className="detail">{sku.realHeight}</span>
                </Col>
              )}
            </Row>
            <Row type="flex" gutter={16}>
              <Col span={3}>
                <span className="label term">Largura</span>
                <span className="detail">{sku.width}</span>
              </Col>
              {!isEmpty(sku.realWeight) && (
                <Col span={3}>
                  <span className="label term">Largura real</span>
                  <span className="detail">{sku.realWeight}</span>
                </Col>
              )}
              <Col span={3}>
                <span className="label term">Tamanho</span>
                <span className="detail">{sku.lenght}</span>
              </Col>
              {!isEmpty(sku.realLenght) && (
                <Col span={3}>
                  <span className="label term">Tamanho real</span>
                  <span className="detail">{sku.realLenght}</span>
                </Col>
              )}
            </Row>
          </Panel>
        </Collapse>
      ))}
  </Fragment>
);

SkuDataItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default SkuDataItem;
