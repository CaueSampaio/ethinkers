import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Layout, Row, Col, Form, Input, Button } from 'antd';

import logo from '../../../assets/img/white-logo.png';

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
      form: { getFieldDecorator },
    } = this.props;
    const { Content } = Layout;
    return (
      <div className="login-page">
        <Layout style={{ background: '#fff' }}>
          <Content style={{ height: '100vh' }}>
            <Row type="flex" justify="space-between">
              <Col className="logo-container" span={12}>
                <img className="login-logo" src={logo} alt="logo" />
              </Col>
              <Col className="login-container" span={12}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item className="login-form-field" label="Email">
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
                  <Form.Item className="login-form-field" label="Senha">
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor insira sua senha!',
                        },
                      ],
                    })(<Input type="password" placeholder="Senha" />)}
                  </Form.Item>
                  <Form.Item type="flex" justify="right">
                    <a className="login-form-forgot" href="forgot.html">
                      Esqueceu sua senha?
                    </a>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      LOGIN
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <p>
                      Ainda não possui uma conta?
                      <a href="new-user.html">Cadastre-se</a>
                    </p>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Content>
        </Layout>
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
