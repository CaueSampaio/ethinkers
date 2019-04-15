import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Button, Divider, notification, Skeleton } from 'antd';
import { isEmpty } from 'lodash';

import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../../../state/ducks/channelProducts';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import BadRequestNotificationBody from '../../../../../../components/BadRequestNotificationBody';

import './style.less';

class SynchronizeProducts extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    selectedProducts: PropTypes.array,
    filterValues: PropTypes.object.isRequired,
    // synchronizeProductsError: PropTypes.object,
    // synchronizeProductsIsLoading: PropTypes.bool.isRequired,
    channelProducts: PropTypes.object.isRequired,
    channelsProductsIsLoading: PropTypes.bool.isRequired,
  };

  state = {
    synchronizeAllIsLoading: false,
    synchronizeSelectedIsLoading: false,
  };

  handleSynchronizeAll = async () => {
    const {
      actions: { synchronizeChannelProduct, listChannelProducts },
      filterValues,
    } = this.props;
    await this.setState({
      synchronizeAllIsLoading: true,
    });
    const params = {
      status: 4,
      filters: [filterValues],
    };
    const result = await synchronizeChannelProduct(params);
    await this.setState({
      synchronizeAllIsLoading: false,
    });

    const {
      payload: { notsynchronized, synchronized },
    } = result;

    if (!result.error) {
      await notification.success({
        message: 'Sucesso',
        description: `Foram sincronizados ${synchronized} produtos com sucesso. No momento, não é possível sincronizar os outros ${notsynchronized} produtos.`,
      });
      listChannelProducts();
    } else {
      console.log(result);

      const {
        payload: { message },
      } = result;
      notification.error({
        message: 'Erro',
        description: <BadRequestNotificationBody errors={message} />,
      });
    }
  };

  synchronizeSelectedProducts = async () => {
    const {
      actions: { synchronizeChannelProduct, listChannelProducts },
      selectedProducts,
    } = this.props;

    await this.setState({
      synchronizeSelectedIsLoading: true,
    });

    const params = {
      status: 4,
      filters: {
        idsProducts: selectedProducts,
      },
    };

    const result = await synchronizeChannelProduct(params);
    const {
      payload: { notSynchronized, synchronized },
    } = result;

    await this.setState({
      synchronizeSelectedIsLoading: false,
    });
    if (!result.error) {
      await notification.success({
        message: 'Sucesso',
        description: `Não foi possível sincronizar ${notSynchronized} produtos. Produtos sincronizados: ${synchronized}`,
      });
      listChannelProducts();
    } else {
      const {
        payload: { message },
      } = result;
      notification.error({
        message: 'Erro',
        description: <BadRequestNotificationBody errors={message} />,
      });
    }
  };

  render() {
    const {
      selectedProducts,
      channelProducts: { total },
      channelsProductsIsLoading,
    } = this.props;
    const {
      synchronizeAllIsLoading,
      synchronizeSelectedIsLoading,
    } = this.state;
    console.log(selectedProducts);

    return (
      <PrivatePageSection className="synchronize-container">
        <Skeleton
          active
          loading={channelsProductsIsLoading}
          title={false}
          paragraph={{ rows: 3 }}
        >
          <Row type="flex" justify="center" align="middle">
            <Col xs={24} sm={24} md={24} lg={24} xl={11}>
              <Row type="flex" justify="center">
                <Col>
                  <span className="amount-total">{total}</span>
                  <span className="label-amount"> Produtos encontrados</span>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Button
                  disabled={synchronizeSelectedIsLoading}
                  loading={synchronizeAllIsLoading}
                  className="btn-synchronize synchronize-all"
                  onClick={this.handleSynchronizeAll}
                >
                  <span>Sincronizar todos</span>
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
                        <span>OU SINCRONIZE UM OU MAIS PRODUTOS</span>
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
                          disabled={synchronizeAllIsLoading}
                          loading={synchronizeSelectedIsLoading}
                          onClick={this.synchronizeSelectedProducts}
                          className="btn-synchronize"
                        >
                          <span>Sincronizar</span>
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
  synchronizeProductsError: channelProductsSelectors.makeSelectSynchronizeChannelProductError(),
  productsSummaryIsLoading: channelProductsSelectors.makeSelectSynchronizeChannelProductIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(channelProductsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SynchronizeProducts);
