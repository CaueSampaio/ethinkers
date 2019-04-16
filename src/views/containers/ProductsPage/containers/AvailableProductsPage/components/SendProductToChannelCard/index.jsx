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
import {
  channelsActions,
  channelsSelectors,
} from '../../../../../../../state/ducks/channels';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import BadRequestNotificationBody from '../../../../../../components/BadRequestNotificationBody';
import ChannelsFormModal from '../ChannelsFormModal';

class SendProductToChannelCard extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    selectedProducts: PropTypes.array.isRequired,
    createChannelProductError: PropTypes.object,
    filterValues: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    productsIsLoading: PropTypes.bool.isRequired,
    channels: PropTypes.array.isRequired,
  };

  state = {
    sendAllIsLoading: false,
    sendSelectedsIsLoading: false,
    visibleModalChannels: false,
    visibleModalSyncSelecteds: false,
  };

  componentDidMount() {
    this.fetchChannels();
  }

  fetchChannels = async () => {
    const {
      actions: { listChannels, clearChannels },
    } = this.props;
    const { channelSearch } = this.state;
    await clearChannels();
    await listChannels(
      isEmpty(channelSearch) ? null : { search: channelSearch },
    );
  };

  handleChannelSelectSearch = async (value) => {
    await this.setState({
      channelSearch: isEmpty(value) ? null : value,
    });
    this.fetchChannels();
  };

  handleSendAllToChannel = async () => {
    const {
      actions: { createChannelProduct, listProducts },
      filterValues,
      createChannelProductError,
    } = this.props;
    const {
      formSyncAll: { validateFields },
    } = this;

    validateFields(async (err, values) => {
      if (err) return;
      await this.setState({
        sendAllIsLoading: true,
      });
      const params = {
        status: 4,
        filters: [filterValues],
        ...values,
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
        this.handleCancel();
      } else {
        const { message: errorMessage, errors } = createChannelProductError;

        notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
      }
    });
  };

  handleSendSelectedToChannel = async () => {
    const {
      actions: { createChannelProduct, listProducts },
      selectedProducts,
      createChannelProductError,
    } = this.props;

    const {
      formSyncSelecteds: { validateFields, resetFields },
    } = this;
    validateFields(async (err, values) => {
      if (err) return;

      await this.setState({
        sendSelectedsIsLoading: true,
      });
      const filters = {
        idsProducts: selectedProducts,
      };

      const params = {
        status: 4,
        filters,
        ...values,
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
        this.handleCancelSyncSelecteds();
        await resetFields();
        await listProducts();
      } else {
        const { message: errorMessage, errors } = createChannelProductError;
        notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
      }
    });
  };

  showModalSendToChannel = () => {
    this.setState({
      visibleModalChannels: true,
    });
  };

  showModalSendSelectedsToChannel = () => {
    this.setState({
      visibleModalSyncSelecteds: true,
    });
  };

  handleCancelSyncSelecteds = () => {
    this.setState({ visibleModalSyncSelecteds: false });
  };

  handleCancel = () => {
    this.setState({ visibleModalChannels: false });
  };

  getRefSyncAllForm = (ref) => {
    this.formSyncAll = ref;
  };

  getRefSyncSelectedsForm = (ref) => {
    this.formSyncSelecteds = ref;
  };

  render() {
    const {
      selectedProducts,
      products: { total },
      productsIsLoading,
      channels,
    } = this.props;
    const {
      sendAllIsLoading,
      sendSelectedsIsLoading,
      visibleModalChannels,
      visibleModalSyncSelecteds,
    } = this.state;

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
                  onClick={this.showModalSendToChannel}
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
                          onClick={this.showModalSendSelectedsToChannel}
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
        <ChannelsFormModal
          visible={visibleModalChannels}
          onSubmit={this.handleSendAllToChannel}
          isLoading={sendAllIsLoading}
          channels={channels}
          ref={this.getRefSyncAllForm}
          handleCancel={this.handleCancel}
        />
        <ChannelsFormModal
          visible={visibleModalSyncSelecteds}
          onSubmit={this.handleSendSelectedToChannel}
          isLoading={sendSelectedsIsLoading}
          channels={channels}
          ref={this.getRefSyncSelectedsForm}
          handleCancel={this.handleCancelSyncSelecteds}
        />
      </PrivatePageSection>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  productsIsLoading: productsSelectors.makeSelectProductsIsLoading(),
  createChannelProductError: channelProductsSelectors.makeSelectCreateChannelProductError(),
  createChannelProductIsLoading: channelProductsSelectors.makeSelectCreateChannelProductIsLoading(),

  channels: channelsSelectors.makeSelectChannels(),
  channelsIsLoading: channelsSelectors.makeSelectChannelsIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { ...channelProductsActions, ...productsActions, ...channelsActions },
    dispatch,
  ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SendProductToChannelCard);
