import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty, debounce } from 'lodash';
import { Row, Col, Dropdown, Icon, Menu, Avatar } from 'antd';

import {
  productsActions,
  productsSelectors,
} from '../../../../../state/ducks/products';

import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PrivatePageHeaderButton from '../../../../components/PrivatePageHeaderButton';
import PrivatePageSection from '../../../../components/PrivatePageSection';
import UploadButton from './components/UploadButton';
import SendProductToChannelCard from './components/SendProductToChannelCard';
import StandardTable from '../../../../components/StandardTable';
import FilterForm from './components/FilterForm';
import { spinnerAtrr } from '../../../../components/MySpinner';

import './style.less';

class AvailableProductsPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    productsIsLoading: PropTypes.bool.isRequired,
  };

  state = {
    lastId: '',
    // selectedProducts: [],
    // idsProducts: [],
    idsBrands: [],
    idsCategories: [],
    idsChannels: [],
    // refsProducts: [],
    status: [],
    name: '',
    loadingSubmit: false,
    pagination: {},
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
    this.filterChannelProducts();
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
      <Menu.Item>
        <span>Editar</span>
      </Menu.Item>
      {isEmpty(product.channels) && (
        <Menu.Item>
          <span>Remover</span>
        </Menu.Item>
      )}
      {product.status === 0 && (
        <Menu.Item>
          <span>Habilitar</span>
        </Menu.Item>
      )}
      {!isEmpty(product.channels) && (
        <Menu.Item>
          <span>Desabilitar</span>
        </Menu.Item>
      )}
    </Menu>
  );

  getFormRef = (ref) => {
    this.filterForm = ref;
  };

  getTableColumns = () => [
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

  renderHeaderContent = () => (
    <Row type="flex">
      <Link to="available/create">
        <PrivatePageHeaderButton icon="plus-circle">
          Cadastrar Produto
        </PrivatePageHeaderButton>
      </Link>
      <UploadButton textChildren="Atualizar Estoque via Planilha" />
      <UploadButton textChildren="Atualizar Produtos via Planilha" />
    </Row>
  );

  render() {
    const { loadingSubmit, pagination } = this.state;
    const {
      products: { results },
      productsIsLoading,
    } = this.props;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows,
        );
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
            <SendProductToChannelCard />
            <PrivatePageSection>
              <StandardTable
                minWidth={1000}
                rowSelection={rowSelection}
                dataSource={results}
                columns={this.getTableColumns()}
                rowKey={(record) => record.idProduct}
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
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  products: productsSelectors.makeSelectProducts(),
  productsIsLoading: productsSelectors.makeSelectProductsIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(productsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AvailableProductsPage);
