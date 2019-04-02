import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Button, Divider, notification } from 'antd';
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
    synchronizeProductsError: PropTypes.object,
    synchronizeProductsIsLoading: PropTypes.bool.isRequired,
  };

  state = {};

  handleSynchronizeAll = async () => {
    const {
      actions: { synchronizeChannelProduct },
      filterValues,
      synchronizeProductsError,
    } = this.props;
    const params = {
      status: 4,
      filters: [filterValues],
    };
    const result = await synchronizeChannelProduct(params);
    if (!result.error) {
      notification.success({
        message: 'Sucesso',
        description: 'Productos sincronizados com sucesso!',
      });
    } else {
      const { message: errorMessage, errors } = synchronizeProductsError;

      notification.error({
        message: errorMessage,
        description: <BadRequestNotificationBody errors={errors} />,
      });
    }
  };

  synchronizeSelectedProducts = async () => {
    const {
      actions: { synchronizeChannelProduct },
      selectedProducts,
      synchronizeProductsError,
    } = this.props;

    const filters = {
      idsCompanies: [],
      idsBrands: [],
      idsCategories: [],
      refsProducts: [],
      idsProducts: [],
      idsChannels: [],
      status: [],
    };

    await selectedProducts.map((product) => { // eslint-disable-line
      return (
        filters.idsCompanies.push(product.company.id),
        filters.idsBrands.push(product.brand.id),
        filters.idsCategories.push(product.category.id),
        filters.refsProducts.push(product.refProduct),
        filters.idsProducts.push(product.idProduct),
        filters.idsChannels.push(product.channel.id),
        filters.status.push(product.status)
      );
    });

    const params = {
      status: 4,
      filters,
    };
    const result = synchronizeChannelProduct(params);
    if (!result.error) {
      notification.success({
        message: 'Sucesso',
        description: 'Productos sincronizados com sucesso!',
      });
    } else {
      const { message: errorMessage, errors } = synchronizeProductsError;

      notification.error({
        message: errorMessage,
        description: <BadRequestNotificationBody errors={errors} />,
      });
    }
  };

  render() {
    const { selectedProducts, synchronizeProductsIsLoading } = this.props;
    return (
      <PrivatePageSection className="synchronize-container">
        <Row type="flex" justify="center" align="middle">
          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
            <Row type="flex" justify="center">
              <Col>
                <span className="amount-total">100&ensp;</span>
                <span className="label-amount">Produtos encontrados</span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Button
                loading={synchronizeProductsIsLoading}
                className="btn-synchronize-all"
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
                  <Row type="flex" align="middle">
                    <Col span={24} className="synchronize-description">
                      <span>OU SINCRONIZE UM OU MAIS PRODUTOS</span>
                    </Col>
                    <Col className="sub-description" span={24} offset={2}>
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
      </PrivatePageSection>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  synchronizeProductsError: channelProductsSelectors.makeSelectSynchronizeChannelProductError(),
  synchronizeProductsIsLoading: channelProductsSelectors.makeSelectSynchronizeChannelProductIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(channelProductsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SynchronizeProducts);
