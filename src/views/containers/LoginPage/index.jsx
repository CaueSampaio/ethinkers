import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Layout, Row, Col, Form, Input } from 'antd';

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
    const { form } = this.props;
    const { Content } = Layout;
    const { getFieldDecorator } = form;
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
