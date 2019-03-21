import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Form, Input, InputNumber, Button, Row, Col, Select } from 'antd';
import { isEmpty } from 'lodash';
import MaskedInput from 'react-text-mask';

import { ordersActions } from '../../../../../state/ducks/orders';

import {
  brandsActions,
  brandsSelectors,
} from '../../../../../state/ducks/brands';

// import { cpfValidator } from '../../../../../utils/validators/maskedInput';
import { mask, removeFieldMaskFromEvent } from '../../../../../utils/masks';

import StyledFormItem from '../../../../components/StyledFormItem';
import StyledButtonFilter from '../../../../components/StyledButtonFilter';

import './style.less';

const { Option } = Select;

class FilterForm extends Component {
  state = {};

  componentDidMount() {
    const {
      actions: { listBrands },
    } = this.props;
    listBrands();
  }

  clearAllFields = () => {
    const {
      form: { resetFields, setFieldsValue },
    } = this.props;
    resetFields();
    setFieldsValue({ cpf: '' });
  };

  render() {
    const {
      form: { getFieldDecorator },
      handleSubmit,
      brands,
    } = this.props;

    return (
      <div className="form-filter">
        <Row type="flex" justify="space-between">
          <h3>Filtros</h3>
          <Button className="btn-clear" onClick={this.clearAllFields}>
            Limpar
          </Button>
        </Row>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
              <StyledFormItem label="Código:">
                {getFieldDecorator('orderNumber', {
                  initialValue: '',
                })(<InputNumber style={{ width: '100%' }} />)}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
              <StyledFormItem label="CPF:">
                {getFieldDecorator('cpf', {
                  initialValue: '',
                  rules: [
                    {
                      message: 'Preencha o campo CPF corretamente.',
                    },
                  ],
                  getValueFromEvent: removeFieldMaskFromEvent,
                })(<MaskedInput className="ant-input" mask={mask.cpf} />)}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
              <StyledFormItem label="Nome do Cliente:">
                {getFieldDecorator('firstName', {
                  initialValue: '',
                })(<Input />)}
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={24}>
              <StyledFormItem label="Canal de venda:">
                {getFieldDecorator('channel', {})(
                  <Select>
                    {!isEmpty(brands) &&
                      brands.results.map((brand) => (
                        <Option key={brand.Id}>{brand.Name}</Option>
                      ))}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={24}>
              <StyledFormItem label="Status:">
                {getFieldDecorator('status', {
                  initialValue: '',
                })(<Input />)}
              </StyledFormItem>
            </Col>
          </Row>
          <Form.Item>
            <StyledButtonFilter text="Buscar" onClick={handleSubmit} />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

FilterForm.propTypes = {
  form: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  brands: PropTypes.array.isRequired,
};

const withForm = Form.create();

const mapStateToProps = createStructuredSelector({
  brands: brandsSelectors.makeSelectBrands(),
  brandsIsLoading: brandsSelectors.makeSelectBrandsIsLoading(),
  brandsError: brandsSelectors.makeSelectBrandsError(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...brandsActions, ...ordersActions }, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withForm,
  withConnect,
)(FilterForm);
