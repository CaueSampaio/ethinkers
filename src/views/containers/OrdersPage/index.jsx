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

class OrdersPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  state = {};

  componentDidMount() {
    const {
      actions: { listOrders },
    } = this.props;
    listOrders();
  }

  render() {
    const { data, isLoading } = this.props;

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
      },
      {
        title: 'Pagamento',
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
                loading={isLoading && spinnerAtrr}
              />
            </PrivatePageSection>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={7}>
            <PrivatePageSection>
              <FilterForm />
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
