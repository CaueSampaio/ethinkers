import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import { Input } from 'antd';

import StyledFormItem from '../StyledFormItem';

class CurrencyFormField extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,

    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    fieldName: PropTypes.string,
    validRuleText: PropTypes.string,
    precision: PropTypes.string,
    initialValue: PropTypes.number,
  };

  static defaultProps = {
    fieldName: 'price',
    label: 'Preço',
    validRuleText: 'common.currencyValidRule',
    precision: '2',
    initialValue: 0,
  };

  handleCurrencyInputChange = async (event, maskedValue, value) => {
    const {
      fieldName,
      form: { setFieldsValue, validateFields },
    } = this.props;

    await setFieldsValue({ [fieldName]: value });
    await validateFields([fieldName]);
  };

  render() {
    const {
      label,
      fieldName,
      validRuleText,
      precision,
      initialValue,
      form: { getFieldDecorator, getFieldValue, getFieldError },
    } = this.props;

    return (
      <Fragment>
        {getFieldDecorator(fieldName, {
          rules: [
            {
              required: true,
              message: validRuleText,
            },
          ],
          initialValue,
        })(<Input hidden />)}
        <StyledFormItem
          required
          label={label}
          validateStatus={getFieldError(fieldName) ? 'error' : 'success'}
          help={getFieldError(fieldName)}
        >
          <CurrencyInput
            precision={precision}
            prefix="R$"
            decimalSeparator=","
            thousandSeparator="."
            className="ant-input"
            value={getFieldValue(fieldName)}
            onChangeEvent={this.handleCurrencyInputChange}
          />
        </StyledFormItem>
      </Fragment>
    );
  }
}

export default CurrencyFormField;
