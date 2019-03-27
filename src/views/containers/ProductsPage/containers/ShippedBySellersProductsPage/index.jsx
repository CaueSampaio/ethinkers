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

import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PrivatePageSection from '../../../../components/PrivatePageSection';
import StandardTable from '../../../../components/StandardTable';
import FilterForm from './components/FilterForm';
import { spinnerAtrr } from '../../../../components/MySpinner';
import BadRequestNotificationBody from '../../../../components/BadRequestNotificationBody';

const { confirm } = Modal;

class ShippedBySellersProductsPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,

    channelProducts: PropTypes.object.isRequired,
    channelProductsIsLoading: PropTypes.bool.isRequired,
    editStatusError: PropTypes.object,
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

  showConfirmAcceptProduct = (e, product) => {
    const {
      actions: { editChannelProductStatus },
      editStatusError,
    } = this.props;
    const { idProduct, status } = product;

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

  showConfirmRefuseProduct = (e, product) => {
    const {
      actions: { editChannelProductStatus },
      editStatusError,
    } = this.props;
    const { idProduct, status } = product;

    confirm({
      title: 'Deseja realmente recusar este produto?',
      okText: 'Confirmar',
      content: 'Ao recusá-lo, este produto não ficará mais disponível',
      onOk: async () => {
        const result = await editChannelProductStatus(idProduct, status);
        if (!result.error) {
          await notification.success({
            message: 'Sucesso',
            description: 'Produto recusado com sucesso',
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

  getFormRef = (ref) => {
    this.filterForm = ref;
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
    const { channelProducts, channelProductsIsLoading } = this.props;
    const { loadingSubmit, pagination } = this.state;

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

  editStatusIsLoading: channelProductsSelectors.makeSelectEnableOrDisableProductIsLoading(),
  editStatusError: channelProductsSelectors.makeSelectEnableOrDisableProductError(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(channelProductsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ShippedBySellersProductsPage);
