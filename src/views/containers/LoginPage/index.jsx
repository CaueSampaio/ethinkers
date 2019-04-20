/*eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Form, Input, Button, notification } from 'antd';

import hasErrors from '../../../utils/hasErrorsForm';

import {
  userActions,
  userUtils,
  userSelectors,
} from '../../../state/ducks/user';

import './style.less';

class LoginPage extends Component {
  state = {
    loading: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form,
      actions,
      history: { push },
    } = this.props;

    const { handleLogin } = actions;
    const { validateFields } = form;

    this.setState({
      loading: true,
    });

    validateFields(async (err, values) => {
      if (err) return;

      const result = await handleLogin(values);
      if (!result.error) {
        this.setState({
          loading: false,
        });
        push('/orders');
      } else {
        this.setState({
          loading: false,
        });
        notification.error({
          message: 'Login falhou',
          description: 'Credenciais incorretas.',
        });
      }
    });
  };

  render() {
    const {
      form: {
        getFieldDecorator,
        getFieldsError,
        isFieldTouched,
      },
    } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item className="form-field" label="Email">
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
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={
                hasErrors(getFieldsError()) ||
                !isFieldTouched('email') ||
                !isFieldTouched('password')
              }
              className="form-button"
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

LoginPage.propTypes = {
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
)(LoginPage);
