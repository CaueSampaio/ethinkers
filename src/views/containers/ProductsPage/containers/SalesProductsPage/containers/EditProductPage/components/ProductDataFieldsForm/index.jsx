import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty, debounce } from 'lodash';
import { Form, Divider, Row, Col, Input, Select, Button, Spin } from 'antd';

import {
  categoriesActions,
  categoriesSelectors,
} from '../../../../../../../../../state/ducks/categories';

import './style.less';

const { TextArea } = Input;

class EditProductPage extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,

    onSubmit: PropTypes.func.isRequired,
    categories: PropTypes.array,
    categoriesIsLoading: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleCategorySelectSearch = debounce(this.handleCategorySelectSearch);
  }

  state = {};

  componentDidMount() {
    this.fetchCategories();
  }

  handleCategorySelectSearch = async (value) => {
    await this.setState({
      categorySearch: isEmpty(value) ? null : value,
    });
    this.fetchCategories();
  };

  fetchCategories = async () => {
    const {
      actions: { listCategories, clearCategories },
    } = this.props;
    const { categorySearch } = this.state;
    await clearCategories();
    await listCategories(
      isEmpty(categorySearch) ? null : { search: categorySearch },
    );
  };

  render() {
    const {
      onSubmit,
      form: { getFieldDecorator },
      categories,
      categoriesIsLoading,
      isLoading,
    } = this.props;

    return (
      <Fragment>
        <Divider orientation="left">Dados do Produto</Divider>
        <Form onSubmit={onSubmit}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="Nome">
                {getFieldDecorator('name', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Código">
                {getFieldDecorator('idProduct', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Ref">
                {getFieldDecorator('refProduct', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Marca">
                {getFieldDecorator('brand', {})(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Descrição Longa">
                {getFieldDecorator('longDescription', {})(
                  <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Descrição curta">
                {getFieldDecorator('shortDescription', {})(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className="input-multiple-product">
            <Col span={8}>
              <Form.Item label="Meta tags">
                {getFieldDecorator('metaTags', {})(
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    // onChange={handleChange}
                    tokenSeparators={[',']}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Palavras Chave">
                {getFieldDecorator('keyWords', {})(
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    // onChange={handleChange}
                    tokenSeparators={[',']}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Categoria">
                {getFieldDecorator('category', {})(
                  <Select
                    showSearch
                    notFoundContent={
                      categoriesIsLoading ? <Spin size="small" /> : null
                    }
                    onSearch={this.handleCategorySelectSearch}
                  >
                    {categories.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row type="flex" justify="end" gutter={12} style={{ marginTop: 20 }}>
            <Col>
              <Form.Item>
                <Button
                  htmlType="submit"
                  style={{ borderRadius: 50 }}
                  type="primary"
                  loading={isLoading}
                >
                  <span>Atualizar</span>
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Fragment>
    );
  }
}

const withForm = Form.create({
  mapPropsToFields(props) {
    const {
      product = {},
      product: { brand = {}, category = {} },
    } = props;

    return {
      name: Form.createFormField({ value: product.name }),
      idProduct: Form.createFormField({ value: product.idProduct }),
      refProduct: Form.createFormField({ value: product.refProduct }),
      brand: Form.createFormField({ value: brand.name }),
      longDescription: Form.createFormField({ value: product.longDescription }),
      shortDescription: Form.createFormField({
        value: product.shortDescription,
      }),
      metaTags: Form.createFormField({ value: product.metaTags }),
      keyWords: Form.createFormField({ value: product.keyWords }),
      category: Form.createFormField({ value: category.name }),
    };
  },
});

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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withForm,
  withConnect,
)(EditProductPage);
