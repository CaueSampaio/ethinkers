import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { Row, Col, Divider, Button, notification, Modal } from 'antd';

import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../../../../../state/ducks/channelProducts';

import BadRequestNotificationBody from '../../../../../../../../components/BadRequestNotificationBody';

import './style.less';

const { confirm } = Modal;

class ProductList extends Component {
  state = {};

  showConfirmAcceptProduct = (e, product) => {
    const {
      actions: { editChannelProductStatus },
      editStatusError,
      nextProduct,
    } = this.props;
    const { idProduct } = product;
    const status = 6;

    confirm({
      title: 'Deseja realmente aceitar este produto?',
      okText: 'Confirmar',
      content: 'Ao aceitá-lo, este produto ficará disponível',
      onOk: async () => {
        const result = await editChannelProductStatus(idProduct, status);
        if (!result.error) {
          await notification.success({
            message: 'Sucesso',
            description: 'Produto aceito com sucesso',
          });
          await nextProduct();
        } else {
          const { message: errorMessage, errors } = editStatusError;
          notification.error({
            message: errorMessage,
            description: <BadRequestNotificationBody errors={errors} />,
          });
        }
      },
    });
  };

  showConfirmRefuseProduct = (e, product) => {
    const {
      actions: { editChannelProductStatus },
      editStatusError,
      nextProduct,
    } = this.props;
    const { idProduct } = product;
    const status = 6;

    confirm({
      title: 'Deseja realmente recusar este produto?',
      okText: 'Confirmar',
      content: 'Ao recusá-lo, este produto não ficará mais disponível',
      onOk: async () => {
        const result = await editChannelProductStatus(idProduct, status);
        if (!result.error) {
          await notification.success({
            message: 'Sucesso',
            description: 'Produto recusado com sucesso',
          });
          await nextProduct();
        } else {
          const { message: errorMessage, errors } = editStatusError;
          notification.error({
            message: errorMessage,
            description: <BadRequestNotificationBody errors={errors} />,
          });
        }
      },
    });
  };

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
          <Col span={20}>
            <Divider orientation="left">Produto</Divider>
          </Col>
          <Col span={2}>
            <Button
              onClick={(e) => this.showConfirmAcceptProduct(e, channelProduct)}
              className="btn-accept-product"
            >
              <span>Aceitar</span>
            </Button>
          </Col>
          <Col span={2}>
            <Button
              onClick={(e) => this.showConfirmRefuseProduct(e, channelProduct)}
              className="btn-refuse-product"
            >
              <span>Recusar</span>
            </Button>
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
  actions: PropTypes.object.isRequired,
  channelProduct: PropTypes.object.isRequired,
  editStatusError: PropTypes.object,
  nextProduct: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editStatusIsLoading: channelProductsSelectors.makeSelectEnableOrDisableProductIsLoading(),
  editStatusError: channelProductsSelectors.makeSelectEnableOrDisableProductError(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(channelProductsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProductList);
