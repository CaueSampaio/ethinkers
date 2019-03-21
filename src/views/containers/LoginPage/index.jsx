import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { Form, Input, Button } from 'antd';

import hasErrors from '../../../utils/hasErrorsForm';

import './style.less';

class LoginPage extends Component {
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
      form: { getFieldDecorator, getFieldsError, isFieldTouched },
    } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
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
          <Form.Item className="form-field" label="Senha">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Por favor insira sua senha!',
                },
              ],
            })(<Input type="password" placeholder="Senha" />)}
          </Form.Item>
          <Form.Item className="login-form-forgot">
            <Link to="/forgot-password">Esqueceu sua senha?</Link>
          </Form.Item>
          <Form.Item>
            <Link to="/home">
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  hasErrors(getFieldsError()) ||
                  !isFieldTouched('userEmail') ||
                  !isFieldTouched('password')
                }
                className="form-button"
              >
                LOGIN
              </Button>
            </Link>
          </Form.Item>
          <Form.Item>
            <p>
              Ainda não possui uma conta?
              <Link to="/register"> Cadastre-se</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  form: PropTypes.object,
  validateFields: PropTypes.func,
  // getFieldDecorator: PropTypes.func,
};

const withForm = Form.create();

export default compose(withForm)(LoginPage);
