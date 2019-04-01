import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Divider, Collapse, Avatar, Col, Row } from 'antd';

const { Panel } = Collapse;

const SkuDataList = ({ channelProduct: { skus = [], attributes = [] } }) => (
  <Fragment>
    <Divider orientation="left">SKU</Divider>
    {!isEmpty(skus) &&
      skus.map((sku) => (
        <Collapse key={sku.refSku} style={{ marginTop: 15 }}>
          <Panel header={sku.description}>
            <Row type="flex" gutter={24} align="middle">
              <Col span={24}>
                <p className="label-gallery">IMAGENS:</p>
              </Col>
              {!isEmpty(sku.images) &&
                sku.images.map((image) => (
                  <Col span={4} key={image} className="gallery-container">
                    <Avatar size={120} shape="square" src={image} />
                  </Col>
                ))}
            </Row>
            <Row gutter={24} style={{ marginTop: 20 }}>
              <Col span={8}>
                <span className="label term">REF</span>
                <span className="detail">{sku.refSku}</span>
              </Col>
              <Col span={8}>
                <span className="label term">EAN</span>
                <span className="detail">{sku.ean}</span>
              </Col>
              <Col span={4}>
                <span className="label term">Preço de</span>
                <span className="detail">{sku.priceOf}</span>
              </Col>
              <Col span={4}>
                <span className="label term">Preço por</span>
                <span className="detail">{sku.priceBy}</span>
              </Col>
            </Row>
            <Row gutter={24}>
              {!isEmpty(attributes) &&
                attributes.map((attribute) => (
                  <Col span={8} key={attribute.id}>
                    <span className="label term">{attribute.description}</span>
                    <span className="detail">{attribute.value}</span>
                  </Col>
                ))}
              <Col span={16}>
                <span className="label term">Descrição</span>
                <span className="detail">{sku.description}</span>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={4}>
                <span className="label term">Peso</span>
                <span className="detail">{sku.weight}</span>
              </Col>
              <Col span={4}>
                <span className="label term">Peso real</span>
                <span className="detail">{sku.realWeight}</span>
              </Col>
              <Col span={4}>
                <span className="label term">Altura</span>
                <span className="detail">{sku.height}</span>
              </Col>
              <Col span={4}>
                <span className="label term">Altura real</span>
                <span className="detail">{sku.realHeight}</span>
              </Col>
              <Col span={4}>
                <span className="label term">Largura</span>
                <span className="detail">{sku.width}</span>
              </Col>
              <Col span={4}>
                <span className="label term">Largura real</span>
                <span className="detail">{sku.realWidth}</span>
              </Col>
              <Col span={4}>
                <span className="label term">Tamanho</span>
                <span className="detail">{sku.lenght}</span>
              </Col>
              <Col span={4}>
                <span className="label term">Tamanho real</span>
                <span className="detail">{sku.realLenght}</span>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      ))}
  </Fragment>
);

SkuDataList.propTypes = {
  channelProduct: PropTypes.object.isRequired,
};

export default SkuDataList;
