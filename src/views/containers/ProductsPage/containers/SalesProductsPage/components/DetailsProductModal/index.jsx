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
        // shortDescription,
        refProduct,
        metaTags,
        category = {},
        attributes = [],
        brand = {},
        skus = [],
        keyWords,
      },
      channelProductIsLoading,
    } = this.props;
    console.log(channelProductIsLoading);
    return (
      <div>
        <Modal
          title="Detalhes do Produto"
          visible={visible}
          onOk={this.handleOk}
          onCancel={onCancel}
          centered
          width={800}
          footer={[
            <Button
              className="close-button"
              key="submit"
              type="primary"
              onClick={onCancel}
            >
              <span>Fechar</span>
            </Button>,
          ]}
        >
          <Row type="flex" gutter={16} className="details-product">
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <span className="label term">Nome</span>
              <span className="detail">{name}</span>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <span className="label term">Código</span>
              <span className="detail">{idProduct}</span>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <span className="label term">Marca</span>
              <span className="detail">{brand.name}</span>
            </Col>
          </Row>
          <Row type="flex" gutter={16} className="data-item">
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <span className="label term">Ref do produto</span>
              <span className="detail">{refProduct}</span>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <span className="label term">Meta Tags</span>
              <span className="detail">{metaTags}</span>
            </Col>
          </Row>
          <Row type="flex" gutter={16} className="data-item">
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <span className="label term">Palavras chave</span>
              <span className="detail">{keyWords}</span>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <span className="label term">Categoria</span>
              <span className="detail">{category.name}</span>
            </Col>
            {!isEmpty(attributes) &&
              attributes.map((attribute) => (
                <Col
                  key={attribute.idValue}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={8}
                >
                  <span className="label term">Atributo</span>
                  <span className="detail">{attribute.value}</span>
                </Col>
              ))}
          </Row>
          <Row type="flex" gutter={16} className="data-item">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <span className="label term">Descrição longa</span>
              <span className="detail">{longDescription}</span>
            </Col>
          </Row>
          <Divider orientation="left">SKUS</Divider>
          <Row className="data-item">
            {!isEmpty(skus) &&
              skus.map((sku) => (
                <Collapse key={sku.refSku}>
                  <Panel header={sku.refSku} key="1">
                    <Row type="flex" gutter={24} align="middle">
                      {!isEmpty(sku.images) && (
                        <Col xs={24} sm={24} md={2} lg={2} xl={2}>
                          <Avatar
                            size={90}
                            shape="square"
                            src={sku.images[0]}
                          />
                        </Col>
                      )}
                      <Col span={22}>
                        <Row>
                          <Col span={20} offset={2}>
                            <span>Descrição: </span>
                            <span>{sku.description}</span>
                          </Col>
                          <Col span={24} offset={2}>
                            <span>REF: </span>
                            <span>{sku.refSku}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={5} offset={2}>
                            <span>Preço de: </span>
                            <span>{formatCurrency(sku.priceBy)}</span>
                          </Col>
                          <Col span={5}>
                            <span>Preço por: </span>
                            <span>{formatCurrency(sku.priceOf)}</span>
                          </Col>
                        </Row>
                        <Row type="flex" gutter={5}>
                          <Col span={4} offset={2}>
                            <span>Altura:</span>
                            <span>{sku.height}</span>
                          </Col>
                          <Col span={4}>
                            <span>Largura:</span>
                            <span>{sku.width}</span>
                          </Col>
                          <Col span={4}>
                            <span>Peso: </span>
                            <span>{sku.weight}</span>
                          </Col>
                          <Col span={4}>
                            <span>Tamanho: </span>
                            <span>{sku.lenght}</span>
                          </Col>
                          <Col span={4}>
                            <span>Altura: </span>
                            <span>{sku.realHeight}</span>
                          </Col>
                          <Col span={4} offset={2}>
                            <span>Largura: </span>
                            <span>{sku.realWidth}</span>
                          </Col>
                          <Col span={4}>
                            <span>Peso: </span>
                            <span>{sku.realWeight}</span>
                          </Col>
                          <Col span={4}>
                            <span>Tamanho: </span>
                            <span>{sku.realLenght}</span>
                          </Col>
                        </Row>
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
  channelProductIsLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  channelProduct: channelProductsSelectors.makeSelectFindChannelProduct(),
  channelProductIsLoading: channelProductsSelectors.makeSelectFindChannelProductIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(channelProductsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DetailsProductPage);
