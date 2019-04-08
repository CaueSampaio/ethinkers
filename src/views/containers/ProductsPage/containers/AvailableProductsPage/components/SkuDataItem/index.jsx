import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Row, Col, Collapse, Avatar } from 'antd';

import { formatCurrency } from '../../../../../../../utils/masks/formatCurrency';

import './style.less';

const { Panel } = Collapse;

class SkuDataItem extends Component {
  state = {};

  render() {
    const { sku, genExtra } = this.props;
    return (
      <div className="content-collapse-sku">
        <Collapse key={sku.refSku} style={{ marginTop: 15 }}>
          <Panel header={sku.description} extra={genExtra}>
            <Row type="flex" gutter={16} align="middle">
              <Col span={24}>
                <p className="label-gallery">IMAGENS:</p>
              </Col>
              {!isEmpty(sku.images) &&
                sku.images.map((image) => (
                  <Col span={4} key={image} className="gallery-container">
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
              <Col span={8}>
                <span className="label term">REF</span>
                <span className="detail">{sku.refSku}</span>
              </Col>
              <Col span={8}>
                <span className="label term">EAN</span>
                <span className="detail">{sku.ean}</span>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <span className="label term">Descrição</span>
                <span className="detail">{sku.description}</span>
              </Col>
            </Row>
            <p style={{ marginTop: 10 }} className="label-gallery">
              <span>Medidas</span>
            </p>
            <Row gutter={16}>
              <Col span={4}>
                <span className="label term">Preço de</span>
                <span className="detail">{formatCurrency(sku.priceOf)}</span>
              </Col>
              <Col span={4}>
                <span className="label term">Preço por</span>
                <span className="detail">{formatCurrency(sku.priceBy)}</span>
              </Col>
              <Col span={4}>
                <span className="label term">Peso</span>
                <span className="detail">{sku.weight}</span>
              </Col>
              {!isEmpty(sku.realWeight) && (
                <Col span={4}>
                  <span className="label term">Peso real</span>
                  <span className="detail">{sku.realWeight}</span>
                </Col>
              )}
            </Row>
            <Row type="flex" gutter={16}>
              <Col span={4}>
                <span className="label term">Altura</span>
                <span className="detail">{sku.height}</span>
              </Col>
              {!isEmpty(sku.realWidth) && (
                <Col span={4}>
                  <span className="label term">Altura real</span>
                  <span className="detail">{sku.realHeight}</span>
                </Col>
              )}
              <Col span={4}>
                <span className="label term">Largura</span>
                <span className="detail">{sku.width}</span>
              </Col>
              {!isEmpty(sku.realWidth) && (
                <Col span={4}>
                  <span className="label term">Largura real</span>
                  <span className="detail">{sku.realWidth}</span>
                </Col>
              )}
            </Row>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

SkuDataItem.propTypes = {
  sku: PropTypes.object.isRequired,
  // removeSkuItem: PropTypes.func.isRequired,
  genExtra: PropTypes.func,
};

export default SkuDataItem;
