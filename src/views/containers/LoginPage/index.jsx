import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Layout, Row, Col, Form, Input, Button } from 'antd';

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
      <Layout>
        <Content>
          <Row>
            <Col span={14}>Col 1</Col>
            <Col span={10}>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('userEmail', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor insira seu email!',
                      },
                    ],
                  })(<Input placeholder="Email" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor insira sua senha!',
                      },
                    ],
                  })(<Input type="password" placeholder="Senha" />)}
                </Form.Item>
                <Form.Item>
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
