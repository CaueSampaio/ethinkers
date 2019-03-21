import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'antd';

import { ordersActions, ordersSelectors } from '../../../state/ducks/orders';

import PrivatePageHeader from '../../components/PrivatePageHeader';
import PrivatePageSection from '../../components/PrivatePageSection';
import StandardTable from '../../components/StandardTable';
import FilterForm from './components/FilterForm';
import { spinnerAtrr } from '../../components/MySpinner';

import { formatCurrency } from '../../../utils/masks/formatCurrency';

class OrdersPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  state = {
    pagination: {},
    lastId: '',
    search: {
      orderNumber: '',
      cpf: '',
      firstName: '',
      status: '',
    },
  };

  componentDidMount() {
    this.fetchOrders();
  }

  handleTableChange = async (pagination) => {
    const { pagination: paging } = this.state;
    const { data } = this.props;
    const lastId = data.results[data.results.length - 1].orderNumber;

    const currentPagination = { ...paging };
    currentPagination.current = pagination.current;

    await this.setState({ pagination: currentPagination, lastId });

    this.fetchOrders();
  };

  handleSubmitFilters = () => {
    const { validateFields } = this.filterForm;
    const { lastId } = this.state;
    validateFields(async (err, values) => {
      if (err) return;
      await this.setState({
        search: { ...values },
      });
      const params = {
        lastId,
        ...values,
      };
      await this.fetchOrders(params);
    });
  };

  getFormRef = (ref) => {
    this.filterForm = ref;
  };

  fetchOrders = async () => {
    const {
      actions: { listOrders },
    } = this.props;
    console.log(this.filterForm);
    const { pagination, lastId, search } = this.state;
    const params = {
      lastId,
      ...search,
    };
    console.log(params);

    await listOrders(params);
    const {
      data: { total },
    } = this.props;

    const currentPagination = { ...pagination };
    currentPagination.total = total;
    currentPagination.pageSize = 30;

    await this.setState({ pagination: currentPagination });
  };

  render() {
    const { data, isLoading } = this.props;
    const { pagination } = this.state;

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
      },
    ];

    return (
      <div>
        <PrivatePageHeader title="Pedidos" />
        <Row type="flex" gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={17}>
            <PrivatePageSection>
              <StandardTable
                onRow={(record) => { // eslint-disable-line
                  return {
                    onClick: () => {
                      const {
                        history: { push },
                      } = this.props;
                      push(`/orders/${record.orderNumber}`);
                    }, // click row
                  };
                }}
                columns={columns}
                dataSource={data.results}
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
              />
            </PrivatePageSection>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data: ordersSelectors.makeSelectOrders(),
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
