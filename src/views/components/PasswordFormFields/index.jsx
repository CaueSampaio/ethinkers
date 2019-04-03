import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import StyledFormItem from '../StyledFormItem';

class PasswordFormFields extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,

    passwordFieldName: PropTypes.string,
    confirmPasswordFieldName: PropTypes.string,

    passwordLabel: PropTypes.string,
    confirmPasswordLabel: PropTypes.string,

    passwordRequiredRuleText: PropTypes.string,
    passwordMinLengthRuleText: PropTypes.string,

    confirmPasswordRequiredRuleText: PropTypes.string,
    inconsistentPasswordRuleText: PropTypes.string,

    labelCol: PropTypes.object,
    wrapperCol: PropTypes.object,
  };

  static defaultProps = {
    passwordFieldName: 'password',
    confirmPasswordFieldName: 'confirmPassword',

    passwordLabel: 'Senha',
    confirmPasswordLabel: 'Confirmar Senha',

    passwordRequiredRuleText: 'Favor, inserir uma senha',
    passwordMinLengthRuleText: 'A senha deve conter ao menos 8 caracteres.',

    confirmPasswordRequiredRuleText: 'Favor inserir a confirmação de senha.',
    inconsistentPasswordRuleText: 'As duas senhas informadas não conferem.',
  };

  state = {
    confirmPasswordDirty: false,
  };

  handleConfirmPasswordBlur = ({ target: { value } }) =>
    this.setState({
      confirmPasswordDirty: this.state.confirmPasswordDirty || !!value, // eslint-disable-line
    });

  compareToFirstPassword = (rule, value, callback) => {
    const {
      form,
      inconsistentPasswordRuleText,
      passwordFieldName,
    } = this.props;
    if (value && value !== form.getFieldValue(passwordFieldName)) {
      callback(inconsistentPasswordRuleText);
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form, confirmPasswordFieldName } = this.props;
    if (value && this.state.confirmPasswordDirty) { // eslint-disable-line
      form.validateFields([confirmPasswordFieldName], { force: true });
    }
    callback();
  };

  render() {
    const {
      passwordFieldName,
      confirmPasswordFieldName,

      passwordLabel,
      confirmPasswordLabel,

      passwordRequiredRuleText,
      passwordMinLengthRuleText,

      confirmPasswordRequiredRuleText,

      labelCol,
      wrapperCol,

      form: { getFieldDecorator },
    } = this.props;

    return (
      <Fragment>
        <StyledFormItem
          wrapperCol={wrapperCol}
          labelCol={labelCol}
          label={passwordLabel}
        >
          {getFieldDecorator(passwordFieldName, {
            rules: [
              {
                required: true,
                message: passwordRequiredRuleText,
              },
              {
                min: 8,
                message: passwordMinLengthRuleText,
              },
              { validator: this.validateToNextPassword },
            ],
          })(<Input type="password" />)}
        </StyledFormItem>
        <StyledFormItem
          wrapperCol={wrapperCol}
          labelCol={labelCol}
          label={confirmPasswordLabel}
        >
          {getFieldDecorator(confirmPasswordFieldName, {
            rules: [
              {
                required: true,
                message: confirmPasswordRequiredRuleText,
              },
              { validator: this.compareToFirstPassword },
            ],
          })(<Input type="password" onBlur={this.handleConfirmPasswordBlur} />)}
        </StyledFormItem>
      </Fragment>
    );
  }
}

export default PasswordFormFields;
