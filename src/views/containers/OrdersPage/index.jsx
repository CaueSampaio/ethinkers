/*eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { Row, Col, notification, Icon } from 'antd';

import {
  ordersActions,
  ordersSelectors,
  ordersConstants,
} from '../../../state/ducks/orders';
import { formatCurrency } from '../../../utils/masks/formatCurrency';

import PrivatePageHeader from '../../components/PrivatePageHeader';
import PrivatePageSection from '../../components/PrivatePageSection';
import StandardTable from '../../components/StandardTable';
import FilterForm from './components/FilterForm';
import ExportSpreadsheetModal from './components/ExportSpreadsheetModal';
import { spinnerAtrr } from '../../components/MySpinner';

class OrdersPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  state = {
    pagination: {},
    lastId: null,
    search: {
      orderNumber: null,
      cpf: null,
      firstName: null,
      status: null,
    },
    loadingSubmit: false,
    pagesItems: [],
    visibleModalExportProduct: false,
  };

  componentDidMount() {
    this.fetchOrders();
  }

  handleTableChange = async (pagination) => {
    const { pagination: paging } = this.state;
    const { orders } = this.props;
    const lastItem = products.results[products.results.length - 1];

    const currentPagination = { ...paging };
    currentPagination.current = pagination.current;

    let lastPoduct;

    const newItem = {
      id: lastItem.idProduct,
      current: pagination.current,
    };

    if (!isEmpty(this.state.pagesItems)) {
      const prevProduct =
        pagination.current === 1
          ? ''
          : this.state.pagesItems[pagination.current - 2];
      lastPoduct = prevProduct;
    }

    await this.setState({
      pagination: currentPagination,
      lastId: lastPoduct.id,
    });

    this.fetchOrders();
  };

  handleSubmitFilters = () => {
    const { validateFields } = this.filterForm;
    const { lastId } = this.state;
    validateFields(async (err, values) => {
      if (err) return;
      await this.setState({
        search: { ...values },
        loadingSubmit: true,
      });
      const params = {
        lastId,
        ...values,
      };
      await this.fetchOrders(params);
      await this.setState({
        loadingSubmit: false,
      });
    });
  };

  getFormRef = (ref) => {
    this.filterForm = ref;
  };

  handleCancelUpload = (e) => {
    this.setState({
      visibleModalExportProduct: false,
    });
  };

  handleCheckLastItem(val) {
    return this.state.pagesItems.some((item) => val.current === item.current);
  }

  fetchOrders = async () => {
    const {
      actions: { listOrders },
    } = this.props;
    const { pagination, lastId, search } = this.state;
    const params = {
      lastId,
      ...search,
    };

    const result = await listOrders(params);
    const {
      payload: { results },
    } = result;

    if (!isEmpty(results) && !result.error) {
      const {
        orders: { total },
      } = this.props;

      const lastItem = results[results.length - 1];

      const currentPagination = { ...pagination };
      currentPagination.total = total;
      currentPagination.pageSize = 30;

      const item = {
        id: lastItem.idProduct,
        current: 1,
      };

      await this.setState({
        pagination: currentPagination,
      });
      if (!this.handleCheckLastItem(pagination)) {
        this.setState({
          pagesItems: [...this.state.pagesItems, item],
        });
      }
    } else {
      notification.error({
        message: 'Erro',
        description: 'Não foi possível carregar os Pedidos',
      });
    }
  };

  showModalUploadProduct = () => {
    this.setState({
      visibleModalExportProduct: true,
    });
  };

  renderHeaderContent = () => (
    <Row type="flex">
      <button
        className="private-page-header-button"
        onClick={this.showModalUploadProduct}
      >
        <Icon type="download" />
        <span>Exportar Pedidos via Planilha</span>
      </button>
    </Row>
  );

  render() {
    const { orders, isLoading } = this.props;
    const {
      pagination,
      lastId,
      loadingSubmit,
      visibleModalExportProduct,
    } = this.state;
    const { orderStatusEnum } = ordersConstants;

    const columns = [
      {
        title: 'Código',
        dataIndex: 'orderNumber',
        key: 'codigo',
      },
      {
        title: 'Data',
        dataIndex: 'date',
        key: 'date',
        render: (text) => moment(text).format('DD/MM/YYYY'),
      },
      {
        title: 'Cliente',
        dataIndex: 'customer.firstName',
        key: 'customer',
      },
      {
        title: 'Canal',
        dataIndex: 'channel.name',
        key: 'channel',
      },
      {
        title: 'Valor',
        dataIndex: 'totalNetValue',
        key: 'totalNetValue',
        render: (text) => formatCurrency(text),
      },
      {
        title: 'Forma de pagamento',
        dataIndex: 'paymentTypes',
        key: 'paymentTypes',
        render: (text) => !isEmpty(text) && text[0],
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) =>
          orderStatusEnum.map((item) => item.value === text && item.status),
      },
    ];

    return (
      <div>
        <PrivatePageHeader
          title="Pedidos"
          content={this.renderHeaderContent()}
        />
        <Row type="flex" gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={17}>
            <PrivatePageSection>
              <StandardTable
                onRow={(record) => {
                  return {
                    onClick: () => {
                      const {
                        history: { push },
                      } = this.props;
                      push({
                        state: { lastItem: lastId },
                        pathname: `/orders/${record.id}`,
                      });
                    },
                  };
                }}
                columns={columns}
                dataSource={orders.results}
                minWidth={1000}
                rowKey={(record) => record.idOrder}
                pagination={pagination}
                onChange={this.handleTableChange}
                loading={isLoading && spinnerAtrr}
              />
            </PrivatePageSection>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={7}>
            <PrivatePageSection>
              <FilterForm
                ref={(ref) => {
                  this.filterForm = ref;
                }}
                handleSubmit={this.handleSubmitFilters}
                loadingSubmit={loadingSubmit}
              />
            </PrivatePageSection>
          </Col>
        </Row>
        <ExportSpreadsheetModal
          visible={visibleModalExportProduct}
          onCancel={this.handleCancelUpload}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  orders: ordersSelectors.makeSelectOrders(),
  isLoading: ordersSelectors.makeSelectOrdersIsLoading(),
  error: ordersSelectors.makeSelectOrdersError(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ordersActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OrdersPage);
