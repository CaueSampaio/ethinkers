/*eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty, debounce } from 'lodash';
import {
  Row,
  Col,
  Dropdown,
  Icon,
  Menu,
  Avatar,
  notification,
  Modal,
} from 'antd';

import {
  productsActions,
  productsSelectors,
  productsConstants,
} from '../../../../../state/ducks/products';
import {
  channelProductsActions,
  channelProductsSelectors,
  channelProductsConstants,
} from '../../../../../state/ducks/channelProducts';

import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PrivatePageHeaderButton from '../../../../components/PrivatePageHeaderButton';
import PrivatePageSection from '../../../../components/PrivatePageSection';
import UpdateSpreadsheetButtons from './components/UpdateSpreadsheetButtons';
import UpdateSpreadsheetProductButtons from './components/UpdateSpreadsheetProductButtons';
import SendProductToChannelCard from './components/SendProductToChannelCard';
import StandardTable from '../../../../components/StandardTable';
import FilterForm from './components/FilterForm';
import { spinnerAtrr } from '../../../../components/MySpinner';
import BadRequestNotificationBody from '../../../../components/BadRequestNotificationBody';

import './style.less';

const { confirm } = Modal;

class AvailableProductsPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,

    productsIsLoading: PropTypes.bool.isRequired,
    editStatusError: PropTypes.object,
    removeProductError: PropTypes.object,
  };

  state = {
    lastId: '',
    selectedProducts: [],
    idsProducts: [],
    idsBrands: [],
    idsCategories: [],
    idsChannels: [],
    refsProducts: [],
    status: [],
    name: null,
    loadingSubmit: false,
    pagination: {},
    visibleModalUploadProduct: false,
    selectedProducts: [],
  };

  constructor(props) {
    super(props);
    this.filterProducts = debounce(this.fetchProducts);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  onTableChange = async (pagination) => {
    const { products } = this.props;
    const { pagination: page } = this.state;
    const currentPagination = { ...page };
    currentPagination.current = pagination.current;
    const lastItem = products.results.pop();

    await this.setState({
      pagination: currentPagination,
      lastId: lastItem.idProduct,
    });
    this.filterProducts();
  };

  fetchProducts = async () => {
    const {
      actions: { listProducts },
    } = this.props;
    const {
      lastId,
      name,
      idsBrands,
      idsCategories,
      idsChannels,
      // idsProducts,
      // refsProducts,
      status,
      pagination,
    } = this.state;
    const params = {
      lastId,
      name,
      idsBrands,
      idsCategories,
      idsChannels,
      // idsProducts,
      // refsProducts,
      status,
    };
    await listProducts(params);

    const {
      products: { total },
    } = this.props;

    const currentPagination = { ...pagination };
    currentPagination.total = total;
    currentPagination.pageSize = 15;

    await this.setState({ pagination: currentPagination });
  };

  handleSubmitFilters = (e) => {
    e.preventDefault();
    const {
      actions: { listProducts },
    } = this.props;
    const { validateFields } = this.filterForm;
    validateFields(async (err, values) => {
      if (err) return;

      await this.setState({
        ...values,
        loadingSubmit: true,
      });
      const params = { ...values };
      await listProducts(params);
      await this.setState({
        loadingSubmit: false,
      });
    });
  };

  renderItemsMenu = (product) => (
    <Menu>
      <Menu.Item onClick={(e) => e.domEvent.stopPropagation()}>
        <Link to={`/products/available/${product.idProduct}/edit`}>
          <span className="btn-edit">Editar</span>
        </Link>
      </Menu.Item>
      {isEmpty(product.channels) && (
        <Menu.Item onClick={(e) => this.showConfirmRemoveProduct(e, product)}>
          <span className="btn-remove-refuse">Remover</span>
        </Menu.Item>
      )}
      {product.status === 0 && (
        <Menu.Item onClick={(e) => this.showConfirmEnableProduct(e, product)}>
          <span className="btn-disable-enable">Habilitar</span>
        </Menu.Item>
      )}
      {!isEmpty(product.channels) && product.status === 1 && (
        <Menu.Item onClick={(e) => this.showConfirmDisableProduct(e, product)}>
          <span className="btn-disable-enable">Desabilitar</span>
        </Menu.Item>
      )}
    </Menu>
  );

  getFormRef = (ref) => {
    this.filterForm = ref;
  };

  getTableColumns = () => {
    const { productStatus } = productsConstants;

    return [
      {
        title: 'Imagem',
        dataIndex: 'image',
        key: 'imagem',
        render: (text) => <Avatar size="large" shape="square" src={text} />,
      },
      {
        title: 'Código',
        dataIndex: 'idProduct',
        key: 'codigo',
      },
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'nome',
      },
      {
        title: 'Marca',
        dataIndex: 'brand.name',
        key: 'marca',
      },
      {
        title: 'Categoria',
        dataIndex: 'category.name',
        key: 'categoria',
      },
      {
        title: 'Qtd. SKUS',
        dataIndex: 'amountSkus',
        key: 'skus',
      },
      {
        title: 'Canais',
        dataIndex: 'channels',
        key: 'channels',
        render: (channels) => channels.map((item) => item.name),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) =>
          productStatus.map((item) => text === item.value && item.status),
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
  };
  handleCancelUpload = (e) => {
    this.setState({
      visibleModalUpload: false,
    });
  };

  handleCancelUploadProduct = (e) => {
    this.setState({
      visibleModalUploadProduct: false,
    });
  };

  showModalUploadInventories = () => {
    this.setState({
      visibleModalUpload: true,
    });
  };

  showModalUploadProduct = () => {
    this.setState({
      visibleModalUploadProduct: true,
    });
  };
  showConfirmDisableProduct = (e, product) => {
    e.domEvent.stopPropagation();
    const {
      actions: { editProductStatus },
      editStatusError,
    } = this.props;
    const { idProduct, status } = product;

    confirm({
      title: 'Deseja realmente desabilitar este produto?',
      okText: 'Confirmar',
      content: 'Ao desabilitar, este produto não ficará mais disponível',
      onOk: async () => {
        const result = await editProductStatus(idProduct, status);
        if (!result.error) {
          await notification.success({
            message: 'Sucesso',
            description: 'Produto desabilitado com sucesso',
          });
          await this.fetchProducts();
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

  showConfirmRemoveProduct = (e, product) => {
    const {
      actions: { removeProduct },
      removeProductError,
    } = this.props;
    const { idProduct } = product;
    e.domEvent.stopPropagation();

    confirm({
      title: 'Deseja realmente remover este produto?',
      okText: 'Confirmar',
      content: 'Ao remover, este produto não ficará mais disponível',
      onOk: async () => {
        const result = await removeProduct(idProduct);
        if (!result.error) {
          await notification.success({
            message: 'Sucesso',
            description: 'Produto reomvido com sucesso',
          });
          await this.fetchProducts();
        } else {
          const { message: errorMessage, errors } = removeProductError;
          notification.error({
            message: errorMessage,
            description: <BadRequestNotificationBody errors={errors} />,
          });
        }
      },
    });
  };

  showConfirmEnableProduct = (e, product) => {
    const {
      actions: { editProductStatus },
      editStatusError,
    } = this.props;
    const { idProduct, status } = product;
    e.domEvent.stopPropagation();

    confirm({
      title: 'Deseja realmente habilitar este produto?',
      okText: 'Confirmar',
      content: 'Ao habilitar, este produto ficará disponível',
      onOk: async () => {
        const result = await editProductStatus(idProduct, status);
        if (!result.error) {
          await notification.success({
            message: 'Sucesso',
            description: 'Produto habilitado com sucesso',
          });
          await this.fetchProducts();
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

  renderHeaderContent = () => (
    <Row type="flex">
      <Link to="available/create">
        <PrivatePageHeaderButton icon="plus-circle">
          Cadastrar Produto
        </PrivatePageHeaderButton>
      </Link>
      <button
        className="private-page-header-button"
        onClick={this.showModalUploadInventories}
      >
        <Icon type="upload" />
        <span>Atualizar Estoque</span>
      </button>

      <button
        className="private-page-header-button"
        onClick={this.showModalUploadProduct}
      >
        <Icon type="upload" />
        <span>Atualizar Produtos</span>
      </button>
    </Row>
  );

  render() {
    const {
      products,
      products: { results },
      history: { push },
      productsIsLoading,
    } = this.props;
    const {
      loadingSubmit,
      pagination,
      selectedProducts,
      idsProducts,
      idsBrands,
      idsCategories,
      idsChannels,
      refsProducts,
      status,
    } = this.state;

    const filterValues = {
      idsProducts,
      idsBrands,
      idsCategories,
      idsChannels,
      refsProducts,
      status,
    };
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedProducts: selectedRows,
        });
      },
    };

    return (
      <div>
        <PrivatePageHeader
          title="Produtos Disponíveis"
          content={this.renderHeaderContent()}
        />
        <Row type="flex" gutter={24}>
          <Col xs={24} sm={24} md={24} lg={24} xl={17}>
            <SendProductToChannelCard
              filterValues={filterValues}
              selectedProducts={selectedProducts}
              products={products}
              productsIsLoading={productsIsLoading}
            />
            <PrivatePageSection>
              <StandardTable
                minWidth={1000}
                rowSelection={rowSelection}
                dataSource={results}
                columns={this.getTableColumns()}
                onRow={(record) => {
                  // eslint-disable-line
                  return {
                    onClick: () =>
                      push(`/products/available/${record.idProduct}`),
                  };
                }}
                rowKey={(record) => record.idProduct}
                onChange={this.onTableChange}
                pagination={pagination}
                loading={productsIsLoading && spinnerAtrr}
              />
            </PrivatePageSection>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={7}>
            <PrivatePageSection>
              <FilterForm
                onSubmit={this.handleSubmitFilters}
                loading={loadingSubmit}
                ref={this.getFormRef}
              />
            </PrivatePageSection>
          </Col>
        </Row>
        <UpdateSpreadsheetButtons
          textChildren="Upload"
          visible={this.state.visibleModalUpload}
          onCancel={this.handleCancelUpload}
        />
        <UpdateSpreadsheetProductButtons
          textChildren="Upload"
          visible={this.state.visibleModalUploadProduct}
          onCancel={this.handleCancelUploadProduct}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  products: productsSelectors.makeSelectProducts(),
  productsIsLoading: productsSelectors.makeSelectProductsIsLoading(),

  editStatusIsLoading: productsSelectors.makeSelectEditProductStatusIsLoading(),
  editStatusError: productsSelectors.makeSelectCreateProductError(),

  removeProductIsLoading: productsSelectors.makeSelectRemoveProductIsLoading(),
  removeProductError: productsSelectors.makeSelectRemoveProductError(),

  createChannelProductError: channelProductsSelectors.makeSelectCreateChannelProductError(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { ...productsActions, ...channelProductsActions },
    dispatch,
  ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AvailableProductsPage);
