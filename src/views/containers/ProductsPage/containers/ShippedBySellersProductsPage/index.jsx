import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { debounce } from 'lodash';
import { Row, Col, Menu, Dropdown, Icon, Avatar } from 'antd';

import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../state/ducks/channelProducts';

import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PrivatePageSection from '../../../../components/PrivatePageSection';
import StandardTable from '../../../../components/StandardTable';
import FilterForm from './components/FilterForm';
import { spinnerAtrr } from '../../../../components/MySpinner';

class ShippedBySellersProductsPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,

    channelProducts: PropTypes.object.isRequired,
    channelProductsIsLoading: PropTypes.bool.isRequired,
  };

  state = {
    lastId: '',
    idsBrands: [],
    idsCategories: [],
    idsChannels: [],
    name: '',
    loadingSubmit: false,
    pagination: {},
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

  getFormRef = (ref) => {
    this.filterForm = ref;
  };

  getTableColumns = () => {
    const itemMenu = (
      <Menu>
        <Menu.Item>
          <span>1st menu item</span>
        </Menu.Item>
        <Menu.Item>
          <span>2nd menu item</span>
        </Menu.Item>
        <Menu.Item>
          <span>3d menu item</span>
        </Menu.Item>
      </Menu>
    );

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
        dataIndex: 'actions',
        key: 'actions',
        render: () => (
          <Dropdown overlay={itemMenu}>
            <Icon className="ic-config" type="ellipsis" />
          </Dropdown>
        ),
      },
    ];
  };

  render() {
    const { channelProducts, channelProductsIsLoading } = this.props;
    const { loadingSubmit, pagination } = this.state;

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
        <PrivatePageHeader title="Produtos Enviados por Sellers" />
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={24} xl={17}>
            <PrivatePageSection>
              <StandardTable
                minWidth={1000}
                rowSelection={rowSelection}
                dataSource={channelProducts.results}
                columns={this.getTableColumns()}
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
              />
            </PrivatePageSection>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  channelProducts: channelProductsSelectors.makeSelectChannelProducts(),
  channelProductsIsLoading: channelProductsSelectors.makeSelectChannelProductsIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(channelProductsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ShippedBySellersProductsPage);
