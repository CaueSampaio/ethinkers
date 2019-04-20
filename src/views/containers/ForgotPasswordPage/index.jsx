/*eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class ForgotPasswordPage extends Component {
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

    const { forgotPassword } = actions;
    const { validateFields } = form;

    this.setState({
      loading: true,
    });

    validateFields(async (err, values) => {
      if (err) return;

      const result = await forgotPassword(values);
      if (!result.error) {
        notification.success({
          message: 'Recuperação de senha',
          description: 'Senha enviada para o email.',
        });
        this.setState({
          loading: false,
        });
      } else {
        notification.error({
          message: 'Recuperação de senha',
          description: 'Desculpe, ocorreu um erro.',
        });
        this.setState({
          loading: false,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator, verifyIsLoading },
    } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="forgot-password-form">
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
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="form-button"
            >
              RECUPERAR SENHA
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  form: PropTypes.object,
  validateFields: PropTypes.func,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: userSelectors.makeSelectForgotPasswordError(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withForm = Form.create();

export default compose(
  withConnect,
  withForm,
)(ForgotPasswordPage);
