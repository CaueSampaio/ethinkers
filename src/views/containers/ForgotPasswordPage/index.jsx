import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { Form, Input, Button } from 'antd';

import './style.less';

class ForgotPasswordPage extends Component {
  handleSubmit = (e) => {
    const { validateFields } = this.props;
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="forgot-password-form">
          <Form.Item className="form-field" label="Email">
            {getFieldDecorator('userEmail', {
              rules: [
                {
                  type: 'email',
                  message: 'Por favor insira um email válido.',
                },
                {
                  required: true,
                  message: 'Por favor insira seu email.',
                },
              ],
            })(<Input placeholder="Email" />)}
          </Form.Item>
          <Form.Item>
            <Link to="/home">
              <Button type="primary" htmlType="submit" className="form-button">
                RECUPERAR SENHA
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  form: PropTypes.object,
  validateFields: PropTypes.func,
  // getFieldDecorator: PropTypes.func,
};

const withForm = Form.create();

export default compose(withForm)(ForgotPasswordPage);
