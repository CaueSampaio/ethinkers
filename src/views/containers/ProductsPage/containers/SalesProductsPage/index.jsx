/* eslint-disable */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { isEmpty, debounce } from 'lodash';
import {
  Row,
  Col,
  Dropdown,
  Icon,
  Menu,
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
import SummaryProducts from './components/SummaryProducts';
import SynchronizeProducts from './components/SynchronizeProducts';
import StandardTable from '../../../../components/StandardTable';
import FilterForm from './components/FilterForm';
import UploadButton from './components/UploadButton';
import { spinnerAtrr } from '../../../../components/MySpinner';
import DetailsProductModal from './components/DetailsProductModal';
import BadRequestNotificationBody from '../../../../components/BadRequestNotificationBody';

import './style.less';

const { confirm } = Modal;

class SalesProductsPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  state = {
    lastId: '',
    selectedProducts: [],
    idsProducts: [],
    idsBrands: [],
    idsCategories: [],
    idsChannels: [],
    refsProducts: [],
    idsCompanies: [],
    status: [],
    name: '',
    loadingSubmit: false,
    pagination: {},
    visibleModal: false,
    idProduct: '',
    visibleModalUpload: false,
  };

  constructor(props) {
    super(props);
    this.filterChannelProducts = debounce(this.fetchChannelProducts);
  }

  componentDidMount() {
    const {
      actions: { listChannelProductsSummary },
    } = this.props;
    listChannelProductsSummary();
    this.fetchChannelProducts();
  }

  getFormRef = (ref) => {
    this.filterForm = ref;
  };

  onTableChange = async (pagination) => {
    const { channelProducts } = this.props;
    const currentPagination = { ...this.state.pagination };
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
      idsProducts,
      idsCompanies,
      refsProducts,
      status,
    } = this.state;

    const params = {
      lastId,
      name,
      idsBrands,
      idsCategories,
      idsChannels,
      idsProducts,
      idsCompanies,
      refsProducts,
      status,
    };
    await listChannelProducts(params);

    const { total } = this.props.channelProducts;

    const currentPagination = { ...this.state.pagination };
    currentPagination.total = total;
    currentPagination.pageSize = 15;

    await this.setState({ pagination: currentPagination });
  };

  showConfirmRemoveProduct = async (e, id) => {
    const {
      actions: { removeChannelProduct, removeChannelProductIsLoading },
    } = this.props;

    e.domEvent.stopPropagation();

    confirm({
      title: 'Deseja realmente remover este produto?',
      okText: 'Confirmar',
      confirmLoading: removeChannelProductIsLoading,
      content:
        'Ao removê-lo, você não terá mais acesso às informações do mesmo.',
      onOk: async () => {
        const result = await removeChannelProduct(id);
        if (!result.error) {
          notification.success({
            message: 'Sucesso',
            description: 'Produto removido com sucesso!',
          });
          this.fetchChannelProducts();
        }
      },
      onCancel() {},
    });
  };

  showConfirmDesableProduct = (e, idProduct, status) => {
    const {
      actions: { editChannelProductStatus },
      disableIsLoading,
      disableOrEnableError,
    } = this.props;

    e.domEvent.stopPropagation();

    confirm({
      title: 'Deseja realmente desabilitar este produto?',
      okText: 'Confirmar',
      confirmLoading: disableIsLoading,
      content: 'Ao desabilitar, este produto não estará mais disponível.',
      onOk: async () => {
        const result = await editChannelProductStatus(idProduct, status);
        if (!result.error) {
          notification.success({
            message: 'Sucesso',
            description: 'Produto desabilitado com sucesso!',
          });
          this.fetchChannelProducts();
        } else {
          const { message: errorMessage, errors } = disableOrEnableError;

          notification.error({
            message: errorMessage,
            description: <BadRequestNotificationBody errors={errors} />,
          });
        }
      },
      onCancel() {},
    });
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

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visibleModal: false,
    });
  };

  handleCancelUpload = (e) => {
    this.setState({
      visibleModalUpload: false,
    });
  };

  showModalUpload = () => {
    this.setState({
      visibleModalUpload: true,
    });
  };

  clickRowTable = async (record) => {
    await this.setState({
      idProduct: record.idProduct,
    });
    await this.setState({
      visibleModal: true,
    });
  };

  getItemMenu = (record) => {
    const { idProduct, status } = record;

    return (
      <Menu>
        <Menu.Item onClick={(e) => e.domEvent.stopPropagation()}>
          <Link to={`/products/sales/${idProduct}/edit`}>
            <span className="btn-edit">Editar</span>
          </Link>
        </Menu.Item>
        {(status === 12 || status === 3) && (
          <Menu.Item
            onClick={(e) => this.showConfirmRemoveProduct(e, idProduct)}
          >
            <span className="btn-remove-refuse">Remover</span>
          </Menu.Item>
        )}
        {(status === 19 || status === 17) && (
          <Menu.Item
            onClick={(e) =>
              this.showConfirmDesableProduct(e, idProduct, status)
            }
          >
            <span className="btn-disable-enable">Desabilitar</span>
          </Menu.Item>
        )}
      </Menu>
    );
  };

  getTableColumns = () => {
    return [
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
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Status Atualização',
        dataIndex: 'updatestatus',
        key: 'updatestatus',
      },
      {
        key: 'actions',
        render: (record) => (
          <Dropdown overlay={this.getItemMenu(record)}>
            <Icon className="ic-config" type="ellipsis" />
          </Dropdown>
        ),
      },
    ];
  };

  renderHeaderContent = () => (
    <button
      onClick={this.showModalUpload}
      className="private-page-header-button"
    >
      <Icon type="upload" />
      <span>Atualizar Produtos via Planilha</span>
    </button>
  );

  render() {
    const {
      channelProducts,
      channelsProductsIsLoading,
      productsSummary,
      history: { push },
      productsSummaryIsLoading,
      userData: {
        User: { Id: idCompany },
      },
    } = this.props;

    const {
      selectedProducts,
      idsProducts,
      idsBrands,
      idsCategories,
      idsChannels,
      refsProducts,
      idsCompanies,
      status,
      name,
    } = this.state;

    const filterValues = {
      idsProducts,
      idsBrands,
      idsCategories,
      idsChannels,
      refsProducts,
      idsCompanies,
      status,
      name,
    };
    console.log(this.props)

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedProducts: selectedRows,
        });
      },
      getCheckboxProps: (record) => ({
        disabled:
          record.status === 23 ||
          record.status === 19 ||
          record.status === 3 ||
          record.status === 10,
      }),
    };

    return (
      <Fragment>
        <PrivatePageHeader
          title="Produtos a Venda"
          content={this.renderHeaderContent()}
        />
        <Row type="flex" gutter={24} className="table-channel-products">
          <Col xs={24} sm={24} md={24} lg={24} xl={17}>
            <SummaryProducts
              productsSummary={productsSummary}
              productsSummaryIsLoading={productsSummaryIsLoading}
            />
            <SynchronizeProducts
              selectedProducts={selectedProducts}
              filterValues={filterValues}
              channelProducts={channelProducts}
              channelsProductsIsLoading={channelsProductsIsLoading}
            />
            <PrivatePageSection className="table-sales-products">
              <StandardTable
                minWidth={1000}
                onRow={(record) => {
                  return {
                    onClick: (e) => {
                      push(`/products/sales/${record.idProduct}`);
                    },
                  };
                }}
                rowSelection={rowSelection}
                dataSource={channelProducts.results}
                columns={this.getTableColumns()}
                rowKey={(record) => record.idProduct}
                pagination={this.state.pagination}
                onChange={this.onTableChange}
                loading={channelsProductsIsLoading && spinnerAtrr}
              />
            </PrivatePageSection>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={7}>
            <PrivatePageSection>
              <FilterForm
                ref={this.getFormRef}
                onSubmit={this.handleSubmitFilters}
                loading={this.state.loadingSubmit}
                idCompany={idCompany}
              />
            </PrivatePageSection>
          </Col>
        </Row>
        {!isEmpty(this.state.idProduct) && (
          <DetailsProductModal
            onCancel={this.handleCancel}
            visible={this.state.visibleModal}
            idProduct={this.state.idProduct}
          />
        )}
        <UploadButton
          textChildren="Upload"
          visible={this.state.visibleModalUpload}
          onCancel={this.handleCancelUpload}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  channelProducts: channelProductsSelectors.makeSelectChannelProducts(),
  channelsProductsIsLoading: channelProductsSelectors.makeSelectChannelProductsIsLoading(),

  removeChannelProductIsLoading: channelProductsSelectors.makeSelectRemoveChannelProductIsLoading(),
  removeChannelProductError: channelProductsSelectors.makeSelectRemoveChannelProductError(),

  disableIsLoading: channelProductsSelectors.makeSelectEnableOrDisableProductIsLoading(),
  disableOrEnableError: channelProductsSelectors.makeSelectEnableOrDisableProductError(),

  productsSummary: channelProductsSelectors.makeSelectListChannelProductSummary(),
  productsSummaryIsLoading: channelProductsSelectors.makeSelectListChannelProductSummaryIsLoading(),

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

export default compose(withConnect)(SalesProductsPage);
