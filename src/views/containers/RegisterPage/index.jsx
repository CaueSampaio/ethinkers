/*eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Form, Input, Button, notification, Row, Col, Checkbox } from 'antd';

import hasErrors from '../../../utils/hasErrorsForm';

import {
  userActions,
  userUtils,
  userSelectors,
} from '../../../state/ducks/user';

import './style.less';

class RegisterPage extends Component {
  state = {
    loading: false,
  };

  getUserLocalStorage = () => {
    return JSON.parse(localStorage.getItem('users'));
  }

  handleSubmit = (e) => {
    const userList = [];
    if('users' in localStorage) {
      JSON.parse(localStorage.getItem('users')).forEach(user => {userList.push(user)});
    }
    e.preventDefault();
    const { form } = this.props;

    const { validateFields } = form;

    this.setState({
      loading: true,
    });

    validateFields(async (err, values) => {
      if (err) return;

      setTimeout(() => {
        this.setState({
          loading: false,
        });
        if(userList.length < 1 || !!userList) {
            userList.push(values);
            localStorage.setItem('users', JSON.stringify(userList));
        } else {
            localStorage.setItem('users', JSON.stringify(values));
        }
        notification.success({
          message: 'Dados cadastrados com sucesso',
        });
      }, 2000);
    });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldsError, isFieldTouched },
    } = this.props;
    const { loading } = this.state;
    return (
      <div className="register">
        <h2>Por favor, complete o cadastro abaixo.</h2>
        <Form onSubmit={this.handleSubmit} className="register-form">
          <Row gutter={16}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xxl={12}
              className="form-container"
            >
              <Form.Item className="form-field">
                {getFieldDecorator('firstname', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor insira um nome.',
                    },
                  ],
                })(<Input placeholder="Nome" />)}
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xxl={12}
              className="form-container"
            >
              <Form.Item className="form-field">
                {getFieldDecorator('lastname', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor insira um sobrenome.',
                    },
                  ],
                })(<Input placeholder="Sobrenome" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xxl={24}
              className="form-container"
            >
              <Form.Item className="form-field">
                {getFieldDecorator('email', {
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
                })(<Input placeholder="e-mail" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xxl={24}
              className="form-container"
            >
              <Form.Item className="form-field">
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor insira seu telefone.',
                    },
                  ],
                })(<Input placeholder="Telefone" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xxl={24}
              className="form-container"
            >
              <Form.Item className="form-field">
                {getFieldDecorator('cpf', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor insira seu cpf.',
                    },
                  ],
                })(<Input placeholder="CPF" />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ marginBottom: 8, marginTop: 50 }}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
              rules: [
                {
                  required: true,
                  message: 'Por favor, aceite os termos de uso.',
                },
              ],
            })(
              <Checkbox style={{ color: '#43425D', fontSize: 16 }}>
                Eu aceito os termos e condições
              </Checkbox>,
            )}
          </Form.Item>
          <div className="register-bottom">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={
                  hasErrors(getFieldsError()) ||
                  !isFieldTouched('email') ||
                  !isFieldTouched('firstname') ||
                  !isFieldTouched('lastname') ||
                  !isFieldTouched('phone') ||
                  !isFieldTouched('cpf')
                }
                className="form-button"
              >
                Cadastrar
              </Button>
            </Form.Item>
            <Link style={{ color: '#43425D', fontSize: 16 }} to="/">
              Não tem conta? Cadastre-se aqui!
            </Link>{' '}
            <br />
            <Link style={{ color: '#43425D', fontSize: 16 }} to="/list-user">
              Clique para ver usuarios cadastrados
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  validateFields: PropTypes.func,
  form: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userData: userSelectors.makeSelectUserData(),
  error: userSelectors.makeSelectUserError(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userActions, dispatch),
});

const withForm = Form.create();

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withForm,
  withConnect,
)(RegisterPage);
