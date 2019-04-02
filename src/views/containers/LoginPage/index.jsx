/*eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';

import hasErrors from '../../../utils/hasErrorsForm';

import {
  authActions,
  authUtils,
} from '../../../state/ducks/auth';

import './style.less';

class LoginPage extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      t,
      form,
      actions,
      history: { push },
    } = this.props;

    const { handleLogin } = actions;
    const { validateFields } = form;

    validateFields(async (err, values) => {
      console.log("values", values)
      if (err) return;

      const result = await handleLogin(values);

      if (!result.error) {
        const { discriminator } = userUtils.getUserData(result.payload.token);

        // push(getHomeRoute(discriminator));
      } else {
        notification.error({
          message: t('login.loginFailed'),
          description: t('login.loginFailedMessage'),
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldsError, isFieldTouched },
    } = this.props;
    console.log(this.props);
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
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(authActions, dispatch),
});

const withForm = Form.create();

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withForm, withConnect)(LoginPage);
