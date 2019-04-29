/* eslint-disable */
import React, { Component } from 'react';
import { List } from 'antd';
import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import InvoiceItemComponent from './InvoiceItem';
import './style.less';
class InvoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceList: [],
      orderItems: [],
    };
  }

  componentDidMount() {
    const { invoiceList, products } = this.props;
    this.setState({
      invoiceList,
      orderItems: products,
    });
  }

  render() {
    const { invoiceList, orderItems } = this.props;

    return (
      <div>
        <PrivatePageSection>
          <h3>Invoices</h3>
          <List
            rowKey={'id'}
            grid={{ gutter: 24, lg: 1, md: 1, sm: 1, xs: 1 }}
            dataSource={[...invoiceList]}
            renderItem={(invoice) => (
              <List.Item key={invoice.id}>
                <InvoiceItemComponent orderItems={orderItems} invoice={invoice} />
              </List.Item>
            )}
          />
        </PrivatePageSection>
      </div>
    );
  }
}

export default InvoiceList;
