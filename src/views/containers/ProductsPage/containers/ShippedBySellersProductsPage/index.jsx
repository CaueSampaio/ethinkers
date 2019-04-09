import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { debounce } from 'lodash';
import {
  Row,
  Col,
  Menu,
  Dropdown,
  Icon,
  Avatar,
  Modal,
  notification,
} from 'antd';

import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../state/ducks/channelProducts';
import { userActions, userSelectors } from '../../../../../state/ducks/user';

import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PrivatePageSection from '../../../../components/PrivatePageSection';
import StandardTable from '../../../../components/StandardTable';
import FilterForm from './components/FilterForm';
import RefuseProductModal from './components/RefuseProductModal';
import { spinnerAtrr } from '../../../../components/MySpinner';
import BadRequestNotificationBody from '../../../../components/BadRequestNotificationBody';

const { confirm } = Modal;

class ShippedBySellersProductsPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    channelProducts: PropTypes.object.isRequired,
    channelProductsIsLoading: PropTypes.bool.isRequired,
    editStatusError: PropTypes.object,
    userData: PropTypes.object.isRequired,
    editStatusIsLoading: PropTypes.bool.isRequired,
  };

  state = {
    lastId: '',
    idsBrands: [],
    idsCategories: [],
    idsChannels: [],
    name: '',
    loadingSubmit: false,
    pagination: {},
    visibleModal: false,
    productSelected: {},
  };

  constructor(props) {
    super(props);
    this.filterChannelProducts = debounce(this.fetchChannelProducts);
  }

  componentDidMount() {
    this.fetchChannelProducts();
  }

  onTableChange = async (pagination) => {
    const { channelProducts } = this.props;
    const { pagination: page } = this.state;
    const currentPagination = { ...page };
    currentPagination.current = pagination.current;
    const lastItem = channelProducts.results.pop();

    await this.setState({
      pagination: currentPagination,
      lastId: lastItem.idProduct,
    });
    this.filterChannelProducts();
  };

  fetchChannelProducts = async () => {
    const {
      actions: { listChannelProducts },
    } = this.props;
    const {
      lastId,
      name,
      idsBrands,
      idsCategories,
      idsChannels,
      // idsCompanies
      pagination,
    } = this.state;

    const params = {
      lastId,
      name,
      idsBrands,
      idsCategories,
      idsChannels,
      // idsCompanies
    };
    await listChannelProducts(params);

    const {
      channelProducts: { total },
    } = this.props;

    const currentPagination = { ...pagination };
    currentPagination.total = total;
    currentPagination.pageSize = 15;

    await this.setState({ pagination: currentPagination });
  };

  handleSubmitFilters = (e) => {
    e.preventDefault();
    const {
      actions: { listChannelProducts },
    } = this.props;
    const { validateFields } = this.filterForm;
    validateFields(async (err, values) => {
      if (err) return;

      await this.setState({
        ...values,
        loadingSubmit: true,
      });
      const params = { ...values };
      await listChannelProducts(params);
      await this.setState({
        loadingSubmit: false,
      });
    });
  };

  showConfirmAcceptProduct = (e, product) => {
    const {
      actions: { editChannelProductStatus },
      editStatusError,
    } = this.props;
    const { idProduct, status } = product;

    e.domEvent.stopPropagation();

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
          await this.fetchChannelProducts();
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

  handleSubmitRefuse = () => {
    const {
      actions: { editChannelProductStatus },
      editStatusError,
    } = this.props;
    const {
      productSelected: { idProduct, status },
    } = this.state;
    const { validateFields } = this.formRefuse;

    validateFields(async (err, values) => {
      const { reason } = values;
      if (err) return;
      const params = {
        status,
        reason,
      };

      const result = await editChannelProductStatus(idProduct, params);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'Produto recusado com sucesso',
        });
        await this.handleCancelModal();
        await this.fetchChannelProducts();
      } else {
        const { message: errorMessage, errors } = editStatusError;
        await notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
        await this.handleCancelModal();
      }
    });
  };

  showConfirmRefuseProduct = (e, product) => {
    e.domEvent.stopPropagation();
    this.setState({
      visibleModal: true,
      productSelected: product,
    });
  };

  handleCancelModal = () => {
    this.setState({
      visibleModal: false,
    });
  };

  getFormRef = (ref) => {
    this.filterForm = ref;
  };

  getFormRefuse = (ref) => {
    this.formRefuse = ref;
  };

  renderItemsMenu = (product) => (
    <Menu>
      <Menu.Item onClick={(e) => this.showConfirmAcceptProduct(e, product)}>
        <span className="btn-accept">Aceitar</span>
      </Menu.Item>
      <Menu.Item onClick={(e) => this.showConfirmRefuseProduct(e, product)}>
        <span className="btn-remove-refuse">Recusar</span>
      </Menu.Item>
    </Menu>
  );

  getTableColumns = () => [
    {
      title: 'Imagem',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Avatar size="large" shape="square" src={text} />,
    },
    {
      title: 'Código',
      dataIndex: 'idProduct',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Marca',
      dataIndex: 'brand.name',
      key: 'brand',
    },
    {
      title: 'Categoria',
      dataIndex: 'category.name',
      key: 'category',
    },
    {
      title: 'Canal',
      dataIndex: 'channel.name',
      key: 'channel',
    },
    {
      key: 'actions',
      render: (record) => (
        <Dropdown overlay={this.renderItemsMenu(record)}>
          <Icon className="ic-config" type="ellipsis" />
        </Dropdown>
      ),
    },
  ];

  render() {
    const {
      channelProducts,
      channelProductsIsLoading,
      history: { push },
      userData: {
        User: { Id: idCompany },
      },
      editStatusIsLoading,
    } = this.props;
    const { loadingSubmit, pagination, visibleModal } = this.state;

    return (
      <div>
        <PrivatePageHeader title="Produtos Enviados por Sellers" />
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={24} xl={17}>
            <PrivatePageSection>
              <StandardTable
                minWidth={1000}
                dataSource={channelProducts.results}
                columns={this.getTableColumns()}
                onRow={(record) => { // eslint-disable-line
                  return {
                    onClick: () =>
                      push(`/products/shipped/${record.idProduct}`),
                  };
                }}
                rowKey={(record) => record.idProduct}
                pagination={pagination}
                onChange={this.onTableChange}
                loading={channelProductsIsLoading && spinnerAtrr}
              />
            </PrivatePageSection>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={7}>
            <PrivatePageSection>
              <FilterForm
                ref={this.getFormRef}
                loading={loadingSubmit}
                onSubmit={this.handleSubmitFilters}
                idCompany={idCompany}
              />
            </PrivatePageSection>
          </Col>
        </Row>
        <RefuseProductModal
          visible={visibleModal}
          onSubmit={this.handleSubmitRefuse}
          onCancel={this.handleCancelModal}
          editStatusIsLoading={editStatusIsLoading}
          ref={this.getFormRefuse}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  channelProducts: channelProductsSelectors.makeSelectChannelProducts(),
  channelProductsIsLoading: channelProductsSelectors.makeSelectChannelProductsIsLoading(),

  editStatusIsLoading: channelProductsSelectors.makeSelectEnableOrDisableProductIsLoading(),
  editStatusError: channelProductsSelectors.makeSelectEnableOrDisableProductError(),

  userData: userSelectors.makeSelectUserData(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { ...channelProductsActions, ...userActions },
    dispatch,
  ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ShippedBySellersProductsPage);
