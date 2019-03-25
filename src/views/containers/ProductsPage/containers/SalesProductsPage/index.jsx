/* eslint-disable */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import {
  Row,
  Col,
  Dropdown,
  Icon,
  Menu,
  Avatar,
  Button,
  Upload,
  Modal,
  notification,
} from 'antd';

import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../state/ducks/channelProducts';

import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PrivatePageSection from '../../../../components/PrivatePageSection';
import SummaryProducts from './components/SummaryProducts';
import SynchronizeProducts from './components/SynchronizeProducts';
import StandardTable from '../../../../components/StandardTable';
import FilterForm from './components/FilterForm';
import UploadButton from '../../../../components/UploadButton';
import { spinnerAtrr } from '../../../../components/MySpinner';

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

  showConfirmRemoveProduct = (id) => {
    const {
      actions: { removeChannelProduct, removeChannelProductIsLoading },
    } = this.props;

    confirm({
      title: 'Deseja realmente recusar este produto?',
      okText: 'Confirmar',
      confirmLoading: removeChannelProductIsLoading,
      content:
        'Ao recusá-lo, você não terá mais acesso às informações do mesmo.',
      onOk: async () => {
        const result = await removeChannelProduct(id);
        if (!result.error) {
          notification.success({
            message: 'Sucesso',
            description: 'Produto recusado com sucesso!',
          });
          this.fetchChannelProducts();
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

  getItemMenu = (record) => {
    const { idProduct, status } = record;

    return (
      <Menu>
        <Menu.Item>
          <Link to={`/products/sales/${idProduct}/edit`}>Editar</Link>
        </Menu.Item>
        {(status === 12 || status === 3) && (
          <Menu.Item onClick={() => this.showConfirmRemoveProduct(idProduct)}>
            <span>Remover</span>
          </Menu.Item>
        )}
        {(status === 19 || status === 17) && (
          <Menu.Item>
            <span>Desabilitar</span>
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
        key: 'actions',
        render: (record) => (
          <Dropdown overlay={this.getItemMenu(record)}>
            <Icon className="ic-config" type="ellipsis" />
          </Dropdown>
        ),
      },
    ];
  };

  renderHeaderContent = () => <UploadButton />;

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedProducts: selectedRows,
        });
      },
    };

    const { selectedProducts } = this.state;
    const { channelProducts, channelsProductsIsLoading, productsSummary } = this.props;
    console.log(this.props.removeChannelProductIsLoading);

    return (
      <Fragment>
        <PrivatePageHeader
          title="Produtos a Venda"
          content={this.renderHeaderContent()}
        />
        <Row type="flex" gutter={24}>
          <Col xs={24} sm={24} md={24} lg={24} xl={17}>
            <SummaryProducts productsSummary={productsSummary} />
            <SynchronizeProducts selectedProducts={selectedProducts} />
            <PrivatePageSection>
              <StandardTable
                minWidth={1000}
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
              />
            </PrivatePageSection>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  channelProducts: channelProductsSelectors.makeSelectChannelProducts(),
  channelsProductsIsLoading: channelProductsSelectors.makeSelectChannelProductsIsLoading(),

  removeChannelProductIsLoading: channelProductsSelectors.makeSelectRemoveChannelProductIsLoading(),
  removeChannelProductError: channelProductsSelectors.makeSelectRemoveChannelProductError(),

  productsSummary: channelProductsSelectors.makeSelectListChannelProductSummary(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(channelProductsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SalesProductsPage);
