/*eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'antd';

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
  };

  componentDidMount() {
    this.fetchOrders();
  }

  handleTableChange = async (pagination) => {
    const { pagination: paging } = this.state;
    const { orders } = this.props;
    const lastItem = orders.results.pop();

    const currentPagination = { ...paging };
    currentPagination.current = pagination.current;

    await this.setState({
      pagination: currentPagination,
      lastId: lastItem.orderNumber,
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

  fetchOrders = async () => {
    const {
      actions: { listOrders },
    } = this.props;
    const { pagination, lastId, search } = this.state;
    const params = {
      lastId,
      ...search,
    };

    await listOrders(params);
    const {
      orders,
      orders: { total },
    } = this.props;

    const lastItem = orders.results.pop();
    const currentPagination = { ...pagination };
    currentPagination.total = total;
    currentPagination.pageSize = 15;

    await this.setState({
      pagination: currentPagination,
      lastId: lastItem.orderNumber,
    });
  };

  render() {
    const { orders, isLoading } = this.props;
    const { pagination, lastId, loadingSubmit } = this.state;
    const { orderStatusEnum } = ordersConstants;
    const teste = orderStatusEnum.map((item) => item);

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
        dataIndex: 'paymentType',
        key: 'paymentType',
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
        <PrivatePageHeader title="Pedidos" />
        <Row type="flex" gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={17}>
            <PrivatePageSection>
              <StandardTable
                onRow={(record) => {
                  // eslint-disable-line
                  return {
                    onClick: () => {
                      const {
                        history: { push },
                      } = this.props;
                      push({
                        state: { lastItem: lastId },
                        pathname: `/orders/${record.id}`,
                      });
                    }, // click row
                  };
                }}
                columns={columns}
                dataSource={orders.results}
                minWidth={1000}
                rowKey={(record) => record.orderNumber}
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
