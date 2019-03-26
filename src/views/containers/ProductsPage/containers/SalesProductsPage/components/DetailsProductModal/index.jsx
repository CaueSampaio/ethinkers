/*eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { Modal, Row, Col, Collapse, Divider, Avatar, Button } from 'antd';

import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../../../state/ducks/channelProducts';

import { formatCurrency } from '../../../../../../../utils/masks/formatCurrency';

import './style.less';

const { Panel } = Collapse;

class DetailsProductPage extends Component {
  state = {};

  componentDidMount() {
    const {
      actions: { findChannelProduct },
      idProduct,
    } = this.props;
    findChannelProduct(idProduct);
  }

  render() {
    const {
      visible,
      onCancel,
      // channelProduct,
      channelProduct: {
        name,
        idProduct,
        longDescription,
        shortDescription,
        refProduct,
        metaTags,
        category = {},
        attributes = [],
        brand = {},
        skus = [],
        keyWords,
      },
    } = this.props;

    return (
      <div>
        <Modal
          title={name}
          visible={visible}
          onOk={this.handleOk}
          onCancel={onCancel}
          centered
          width={800}
          footer={[
            <Button key="submit" type="primary" onClick={onCancel}>
              Fechar
            </Button>,
          ]}
        >
          <Row type="flex" gutter={16} className="details-product">
            <Col span={8}>
              <span className="label">Nome:</span>
              <span>{name}</span>
            </Col>
            <Col span={8}>
              <span className="label">Código:</span>
              <span>{idProduct}</span>
            </Col>
            <Col span={8}>
              <span className="label">Marca:</span>
              <span>{brand.name}</span>
            </Col>
          </Row>
          <Row type="flex" gutter={16} className="data-item">
            <Col span={16}>
              <span className="label">Descrição longa:</span>
              <span>{longDescription}</span>
            </Col>
            <Col span={8}>
              <span className="label">Descrição curta:</span>
              <span>{shortDescription}</span>
            </Col>
          </Row>
          <Row type="flex" gutter={16} className="data-item">
            <Col span={8}>
              <span className="label">Ref do produto:</span>
              <span>{refProduct}</span>
            </Col>
            <Col span={8}>
              <span className="label">Meta Tags: </span>
              <span>{metaTags}</span>
            </Col>
            <Col span={8}>
              <span className="label">Palavras chave: </span>
              <span>{keyWords}</span>
            </Col>
          </Row>
          <Row type="flex" gutter={16} className="data-item">
            <Col span={8}>
              <span className="label">Categoria:</span>
              <span>{category.name}</span>
            </Col>
            {!isEmpty(attributes) &&
              attributes.map((attribute) => (
                <Col key={attribute.idValue} span={8}>
                  <span className="label">Atributo:</span>
                  <span>{attribute.value}</span>
                </Col>
              ))}
          </Row>
          <Divider orientation="left">SKUS</Divider>
          <Row className="data-item">
            {!isEmpty(skus) &&
              skus.map((sku) => (
                <Collapse key={sku.refSku}>
                  <Panel header={sku.refSku} key="1">
                    <Row type="flex" gutter={16}>
                      {!isEmpty(sku.images) && (
                        <Col span={2}>
                          <Avatar
                            size="large"
                            shape="square"
                            src={sku.images[0]}
                          />
                        </Col>
                      )}
                      <Col span={9}>
                        <span className="label">Descrição:</span>
                        <span>{sku.description}</span>
                      </Col>
                      <Col span={12}>
                        <span className="label">REF:</span>
                        <span>{sku.refSku}</span>
                      </Col>
                    </Row>
                    <Row
                      gutter={16}
                      className="data-item"
                      type="flex"
                      align="middle"
                    >
                      <Col span={5}>
                        <span className="label">Preço de:</span>
                        <span>{formatCurrency(sku.priceBy)}</span>
                      </Col>
                      <Col span={5}>
                        <span className="label">Preço por:</span>
                        <span>{formatCurrency(sku.priceOf)}</span>
                      </Col>
                      <Col span={3}>
                        <span className="label">Altura:</span>
                        <span>{sku.height}</span>
                      </Col>
                      <Col span={3}>
                        <span className="label">Largura:</span>
                        <span>{sku.width}</span>
                      </Col>
                      <Col span={3}>
                        <span className="label">Peso:</span>
                        <span>{sku.weight}</span>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={5}>
                        <span className="label">Tamanho:</span>
                        <span>{sku.lenght}</span>
                      </Col>
                      <Col span={5}>
                        <span className="label">Altura:</span>
                        <span>{sku.realHeight}</span>
                      </Col>
                      <Col span={3}>
                        <span className="label">Largura:</span>
                        <span>{sku.realWidth}</span>
                      </Col>
                      <Col span={3}>
                        <span className="label">Peso:</span>
                        <span>{sku.realWeight}</span>
                      </Col>
                      <Col span={4}>
                        <span className="label">Tamanho:</span>
                        <span>{sku.realLenght}</span>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              ))}
          </Row>
        </Modal>
      </div>
    );
  }
}

DetailsProductPage.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  idProduct: PropTypes.string.isRequired,
  channelProduct: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  channelProduct: channelProductsSelectors.makeSelectFindChannelProduct(),
  channelsProductIsLoading: channelProductsSelectors.makeSelectFindChannelProductIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(channelProductsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DetailsProductPage);
