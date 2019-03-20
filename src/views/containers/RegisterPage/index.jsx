import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { Form, Input, Button } from 'antd';

import './style.less';

class RegisterPage extends Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    const { validateFields } = this.props;
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('As senhas precisam ser iguais!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="register-form">
          <Form.Item className="form-field" label="Nome">
            {getFieldDecorator('userName', {
              rules: [
                {
                  required: true,
                  message: 'Por favor insira seu nome.',
                },
              ],
            })(<Input placeholder="Nome" />)}
          </Form.Item>
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
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input type="password" placeholder="Senha" />)}
          </Form.Item>
          <Form.Item className="form-field" label="Confirmar senha">
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Por favor, confirme sua senha',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input type="password" placeholder="Confirmar senha" />)}
          </Form.Item>
          <Form.Item>
            <Link to="/home">
              <Button type="primary" htmlType="submit" className="form-button">
                CRIAR CONTA
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  form: PropTypes.object,
  validateFields: PropTypes.func,
  // getFieldDecorator: PropTypes.func,
};

const withForm = Form.create();

export default compose(withForm)(RegisterPage);
