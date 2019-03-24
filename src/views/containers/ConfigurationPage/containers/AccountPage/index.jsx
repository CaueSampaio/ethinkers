/*eslint-disable*/
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Row, Col, Form, Input, Button } from 'antd';

import PrivatePageSection from '../../../../components/PrivatePageSection';

import './style.less';

class AccountPage extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  };

  state = {};

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Fragment>
        <PrivatePageSection>
          <Row>
            <Col>
              <div className="account-content">
                <Form>
                  <Row>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item label="Email">
                        {getFieldDecorator('email', {
                          rules: [
                            {
                              required: true,
                              message: 'O campo e-mail é obrigatório',
                              whitespace: true,
                            },
                          ],
                        })(<Input />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item label="Senha Atual">
                        {getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: 'O campo senha é obrigatório',
                              whitespace: true,
                            },
                          ],
                        })(<Input />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item label="Nova Senha">
                        {getFieldDecorator('newPassword', {
                          rules: [
                            {
                              required: true,
                              message: 'O campo Nova Senha é obrigatório',
                              whitespace: true,
                            },
                          ],
                        })(<Input />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item label="Confirmação da Nova Senha">
                        {getFieldDecorator('confirmPassword', {
                          rules: [
                            {
                              required: true,
                              message:
                                'O campo Confirmação de Senha é obrigatório',
                              whitespace: true,
                            },
                          ],
                        })(<Input />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row type="flex">
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item wrapperCol={{}}>
                        <Button
                          style={{
                            borderRadius: 40,
                            marginTop: 10,
                          }}
                          type="primary"
                          htmlType="submit"
                          // loading={updateIsLoading}
                        >
                          Atualizar
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </PrivatePageSection>
      </Fragment>
    );
  }
}

const withForm = Form.create();

export default compose(withForm)(AccountPage);
