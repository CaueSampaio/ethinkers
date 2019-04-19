import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Row, Col, Collapse, Avatar, Divider } from 'antd';

import { formatCurrency } from '../../../../../utils/masks/formatCurrency';

import './style.less';

const { Panel } = Collapse;

const SkuDataItem = ({ product: { channelSkus = [], attributes = [] } }) => (
  <div className="content-collapse-sku">
    <Divider orientation="left">SKUS</Divider>
    {!isEmpty(channelSkus) &&
      channelSkus.map((sku, i) => (
        <Collapse
          key={i + 1} // eslint-disable-line
          style={{ marginTop: 15 }}
          className="collapse-sku"
        >
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
                      src={image.url}
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
              {sku.realWeight && (
                <Col span={3}>
                  <span className="label term">Peso real</span>
                  <span className="detail">{sku.realWeight}</span>
                </Col>
              )}
              <Col span={3}>
                <span className="label term">Altura</span>
                <span className="detail">{sku.height}</span>
              </Col>
              {sku.realHeight && (
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
              {sku.realWidth && (
                <Col span={3}>
                  <span className="label term">Largura real</span>
                  <span className="detail">{sku.realWeight}</span>
                </Col>
              )}
              <Col span={3}>
                <span className="label term">Tamanho</span>
                <span className="detail">{sku.length}</span>
              </Col>
              {sku.realLength && (
                <Col span={3}>
                  <span className="label term">Tamanho real</span>
                  <span className="detail">{sku.realLength}</span>
                </Col>
              )}
              {sku.cubicWeight && (
                <Col span={3}>
                  <span className="label term">Peso cúbico</span>
                  <span className="detail">{sku.cubicWeight}</span>
                </Col>
              )}
            </Row>
          </Panel>
        </Collapse>
      ))}
  </div>
);

SkuDataItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default SkuDataItem;
