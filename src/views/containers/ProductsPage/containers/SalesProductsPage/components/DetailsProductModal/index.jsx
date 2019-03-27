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
              Fechar
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
                    <Row type="flex" gutter={16}>
                      {!isEmpty(sku.images) && (
                        <Col xs={24} sm={24} md={2} lg={2} xl={2}>
                          <Avatar
                            size="large"
                            shape="square"
                            src={sku.images[0]}
                          />
                        </Col>
                      )}
                      <Col span={12}>
                        <span className="label term">Descrição</span>
                        <span className="detail">{sku.description}</span>
                      </Col>
                      <Col span={10}>
                        <span className="label term">REF</span>
                        <span className="detail">{sku.refSku}</span>
                      </Col>
                    </Row>
                    <Row
                      gutter={16}
                      className="data-item"
                      type="flex"
                      align="middle"
                    >
                      <Col xs={12} sm={12} md={12} lg={5} xl={5} offset={2}>
                        <span className="label term">Preço de</span>
                        <span className="detail">
                          {formatCurrency(sku.priceBy)}
                        </span>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={5} xl={5}>
                        <span className="label term">Preço por</span>
                        <span className="detail">
                          {formatCurrency(sku.priceOf)}
                        </span>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={3} xl={3}>
                        <span className="label term">Altura</span>
                        <span className="detail">{sku.height}</span>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={3} xl={3}>
                        <span className="label term">Largura</span>
                        <span className="detail">{sku.width}</span>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={3} xl={3}>
                        <span className="label term">Peso</span>
                        <span className="detail">{sku.weight}</span>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col xs={12} sm={12} md={12} lg={5} xl={5} offset={2}>
                        <span className="label term">Tamanho</span>
                        <span className="detail">{sku.lenght}</span>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={5} xl={5}>
                        <span className="label term">Altura</span>
                        <span className="detail">{sku.realHeight}</span>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={3} xl={3}>
                        <span className="label term">Largura</span>
                        <span className="detail">{sku.realWidth}</span>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={3} xl={3}>
                        <span className="label term">Peso</span>
                        <span className="detail">{sku.realWeight}</span>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                        <span className="label term">Tamanho</span>
                        <span className="detail">{sku.realLenght}</span>
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
