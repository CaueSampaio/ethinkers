import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, notification } from 'antd';
import { compose } from 'redux';

class InvoiceSkusForm extends Component {
  static propTypes = {
    products: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      invoiceOrderModal: false,
    };
  }

  componentDidMount() {
    const { products } = this.props;
    this.setState({
      products,
    });
  }

  showInvoiceOrderModal = () => {
    this.setState({
      invoiceOrderModal: true,
    });
  };

  renderInvoiceOrderForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div>
        <Form>
          <Form.Item label="Number">
            {getFieldDecorator('number', {
              rules: [
                { required: true, message: 'Por favor insira um number.' },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Series">
            {getFieldDecorator('series', {
              rules: [{ required: true, message: 'Por favor insira series.' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Key">
            {getFieldDecorator('key', {
              rules: [{ required: true, message: 'Por favor insira key.' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Código de rastreio">
            {getFieldDecorator('tracking.code', {})(<Input />)}
          </Form.Item>
          <Form.Item label="Url">
            {getFieldDecorator('tracking.url', {})(<Input />)}
          </Form.Item>
        </Form>
      </div>
    );
  };
}
