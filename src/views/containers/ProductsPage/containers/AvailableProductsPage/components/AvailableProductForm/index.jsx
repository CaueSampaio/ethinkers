import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { debounce } from 'lodash';
import { Row, Col, Form, Input, Select, Button } from 'antd';

import {
  categoriesActions,
  categoriesSelectors,
} from '../../../../../../../state/ducks/categories';

import StyledFormItem from '../../../../../../components/StyledFormItem';
import { SmallSpinner } from '../../../../../../components/MySpinner';

import './style.less';

const { TextArea } = Input;

class AvailableProductForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,

    onSubmit: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    categoriesIsLoading: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.filterCategories = debounce(this.fetchCategories);
  }

  state = {};

  componentDidMount() {
    this.fetchCategories();
  }

  /* onCategoriesSearch = async (search) => {
    this.filterCategories(search);
  };

  onCategoriesSelect = async (value, element) => {
    const {
      props: { title: search },
    } = element;

    await this.filterCategories(search);
  }; */

  fetchCategories = async (search = '') => {
    const {
      actions: { listCategories, clearCategories },
    } = this.props;
    clearCategories();
    await listCategories({ search });
  };

  render() {
    const {
      form: { getFieldDecorator },
      isLoading,
      onSubmit,
    } = this.props;
    const children = [];
    const { categories, categoriesIsLoading } = this.props;

    return (
      <Row type="flex" justify="center">
        <Form style={{ width: '75%' }} onSubmit={onSubmit}>
          <Row className="create-product-form" gutter={24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <StyledFormItem label="Nome">
                {getFieldDecorator('name', {})(<Input />)}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <StyledFormItem label="Ref do Produto">
                {getFieldDecorator('refProduct', {})(<Input />)}
              </StyledFormItem>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <StyledFormItem label="Descrição longa">
                {getFieldDecorator('longDescription', {})(
                  <TextArea rows={3} />,
                )}
              </StyledFormItem>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <StyledFormItem label="Descrição curta">
                {getFieldDecorator('shortDescription', {})(
                  <TextArea autosize={{ minRows: 2, maxRows: 2 }} />,
                )}
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <StyledFormItem label="Marca">
                {getFieldDecorator('idBrand', {})(<Input />)}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <StyledFormItem
                className="input-multiple-product"
                label="Meta Tags"
              >
                {getFieldDecorator('metaTags', {})(
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    tokenSeparators={[',']}
                  >
                    {children}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <StyledFormItem
                className="input-multiple-product "
                label="Palavras Chave"
              >
                {getFieldDecorator('keyWords', {})(
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    tokenSeparators={[',']}
                  >
                    {children}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <StyledFormItem label="Categoria">
                {getFieldDecorator('idCategory', {})(
                  <Select
                    notFoundContent={
                      categoriesIsLoading ? <SmallSpinner /> : null
                    }
                  >
                    {categories.map((item) => (
                      <Select.Option key={item.id} title={item.name}>
                        <span>{item.name}</span>
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
          </Row>
          <Row type="flex" justify="end" gutter={8}>
            <Col>
              <StyledFormItem>
                <Button style={{ borderRadius: 50 }}>Cancelar</Button>
              </StyledFormItem>
            </Col>
            <Col>
              <StyledFormItem>
                <Button
                  loading={isLoading}
                  style={{ borderRadius: 50 }}
                  htmlType="submit"
                  type="primary"
                >
                  Cadastrar
                </Button>
              </StyledFormItem>
            </Col>
          </Row>
        </Form>
      </Row>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categories: categoriesSelectors.makeSelectCategories(),
  categoriesIsLoading: categoriesSelectors.makeSelectCategoriesIsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...categoriesActions,
    },
    dispatch,
  ),
});

const withForm = Form.create();
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withForm,
  withConnect,
)(AvailableProductForm);
