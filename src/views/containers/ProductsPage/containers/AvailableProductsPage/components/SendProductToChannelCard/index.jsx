import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { Row, Col, Button, Divider, notification, Skeleton } from 'antd';

import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../../../state/ducks/channelProducts';
import {
  productsActions,
  productsSelectors,
} from '../../../../../../../state/ducks/products';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import BadRequestNotificationBody from '../../../../../../components/BadRequestNotificationBody';

class SendProductToChannelCard extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    selectedProducts: PropTypes.array.isRequired,
    createChannelProductError: PropTypes.object,
    filterValues: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    productsIsLoading: PropTypes.bool.isRequired,
  };

  state = {
    sendAllIsLoading: false,
    sendSelectedsIsLoading: false,
  };

  handleSendAllToChannel = async () => {
    const {
      actions: { createChannelProduct, listProducts },
      filterValues,
      createChannelProductError,
    } = this.props;
    await this.setState({
      sendAllIsLoading: true,
    });
    const params = {
      status: 4,
      filters: [filterValues],
    };
    const result = await createChannelProduct(params);
    const {
      payload: { productsShipped, productsAlreadyOnChannel },
    } = result;

    if (!result.error) {
      await notification.success({
        message: 'Sucesso',
        description: `Foram enviados para o canal ${productsShipped} produtos e outros ${productsAlreadyOnChannel} produtos já estão no canal.`,
      });
      await this.setState({
        sendAllIsLoading: false,
      });
      await listProducts();
    } else {
      const { message: errorMessage, errors } = createChannelProductError;

      notification.error({
        message: errorMessage,
        description: <BadRequestNotificationBody errors={errors} />,
      });
    }
  };

  handleSendSelectedToChannel = async () => {
    const {
      actions: { createChannelProduct, listProducts },
      selectedProducts,
      createChannelProductError,
    } = this.props;

    await this.setState({
      sendSelectedsIsLoading: true,
    });
    const filters = {
      idsProducts: [],
    };

    await selectedProducts.map((product) =>
      filters.idsProducts.push(product.idProduct),
    );

    const params = {
      status: 4,
      filters,
    };
    const result = await createChannelProduct(params);
    if (!result.error) {
      await notification.success({
        message: 'Sucesso',
        description: 'Produtos enviados para o canal com sucesso!',
      });
      await this.setState({
        sendSelectedsIsLoading: false,
      });
      await listProducts();
    } else {
      const { message: errorMessage, errors } = createChannelProductError;
      notification.error({
        message: errorMessage,
        description: <BadRequestNotificationBody errors={errors} />,
      });
    }
  };

  render() {
    const {
      selectedProducts,
      products: { total },
      productsIsLoading,
    } = this.props;
    const { sendAllIsLoading, sendSelectedsIsLoading } = this.state;

    return (
      <PrivatePageSection className="synchronize-container">
        <Skeleton
          active
          loading={productsIsLoading}
          title={false}
          paragraph={{ rows: 3 }}
        >
          <Row type="flex" justify="center" align="middle">
            <Col xs={24} sm={24} md={24} lg={24} xl={11}>
              <Row type="flex" justify="center">
                <Col>
                  <span className="amount-total">{total}</span>
                  <span className="label-amount">Produtos encontrados</span>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Button
                  disabled={sendSelectedsIsLoading}
                  loading={sendAllIsLoading}
                  className="btn-synchronize"
                  onClick={this.handleSendAllToChannel}
                >
                  <span>Enviar p/ canal</span>
                </Button>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={2}>
              <Divider type="vertical" className="divider" />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={11}>
              <Row type="flex" align="middle" justify="center" gutter={16}>
                <Col>
                  {isEmpty(selectedProducts) ? (
                    <Row type="flex" justify="center" align="middle">
                      <Col span={24} className="synchronize-description">
                        <span>OU ENVIE UM OU MAIS PRODUTOS</span>
                      </Col>
                      <Col className="sub-description" span={24}>
                        <span>NENHUM PRODUTO SELECIONADO AINDA</span>
                      </Col>
                    </Row>
                  ) : (
                    <Row type="flex" align="middle">
                      <Col span={2}>
                        <span className="selected-amount">
                          {selectedProducts.length}
                        </span>
                      </Col>
                      <Col span={2} className="label-selected">
                        <span>Produto(s) Selecionado(s)</span>
                      </Col>
                      <Col offset={7}>
                        <Button
                          disabled={sendAllIsLoading}
                          loading={sendSelectedsIsLoading}
                          onClick={this.handleSendSelectedToChannel}
                          className="btn-synchronize"
                        >
                          <span>Enviar p/ canal</span>
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Skeleton>
      </PrivatePageSection>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  productsIsLoading: productsSelectors.makeSelectProductsIsLoading(),
  createChannelProductError: channelProductsSelectors.makeSelectCreateChannelProductError(),
  createChannelProductIsLoading: channelProductsSelectors.makeSelectCreateChannelProductIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { ...channelProductsActions, ...productsActions },
    dispatch,
  ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SendProductToChannelCard);
