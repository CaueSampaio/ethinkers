import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { Form, Button, Input, Row, Col, Select, Spin, Radio } from 'antd';

import {
  categoriesActions,
  categoriesSelectors,
} from '../../../../../../../../../state/ducks/categories';
import {
  brandsActions,
  brandsSelectors,
} from '../../../../../../../../../state/ducks/brands';

const { TextArea } = Input;
const RadioGroup = Radio.Group;

class ProductDataForm extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    product: PropTypes.object,
    brands: PropTypes.array.isRequired,
    brandsIsLoading: PropTypes.bool.isRequired,
    categories: PropTypes.array,
    categoriesIsLoading: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {};

  componentDidMount() {
    this.fetchCategories();
    this.fetchBrands();
  }

  componentWillUnmount() {
    const {
      actions: { clearBrands, clearCategories },
    } = this.props;
    clearBrands();
    clearCategories();
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

  handleBrandSelectSearch = async (value) => {
    await this.setState({
      brandSearch: isEmpty(value) ? null : value,
    });
    this.fetchBrands();
  };

  fetchBrands = async () => {
    const {
      actions: { listBrands, clearBrands },
    } = this.props;
    const { brandSearch } = this.state;
    await clearBrands();
    await listBrands(isEmpty(brandSearch) ? null : { search: brandSearch });
  };

  render() {
    const {
      form: { getFieldDecorator },
      product,
      product: { brand = {}, category = {} },
      brands,
      brandsIsLoading,
      categoriesIsLoading,
      categories,
      isLoading,
      onSubmit,
    } = this.props;

    return (
      <Fragment>
        <Form onSubmit={onSubmit}>
          <Row gutter={24} className="input-multiple-product">
            <Col span={8}>
              <Form.Item label="Nome">
                {getFieldDecorator('name', {
                  initialValue: product.name,
                  rules: [
                    {
                      required: true,
                      message: `Favor, preencher o campo Nome!`,
                      whitespace: true,
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="REF">
                {getFieldDecorator('refProduct', {
                  initialValue: product.refProduct,
                  rules: [
                    {
                      required: true,
                      message: `Favor, preencher o campo REF!`,
                      whitespace: true,
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Marca:">
                {getFieldDecorator('brand', {
                  initialValue: brand.name,
                  rules: [
                    {
                      required: true,
                      message: `Favor, preencher o campo Marca!`,
                    },
                  ],
                })(
                  <Select
                    showSearch
                    filterOption={false}
                    notFoundContent={
                      brandsIsLoading ? <Spin size="small" /> : null
                    }
                    onSearch={this.handleBrandSelectSearch}
                    style={{ width: '100%' }}
                  >
                    {brands.map((brandItem) => (
                      <Select.Option key={brandItem.id} title={brandItem.name}>
                        {brandItem.name}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Descrição Longa">
                {getFieldDecorator('longDescription', {
                  initialValue: product.longDescription,
                  rules: [
                    {
                      required: true,
                      message: `Favor, preencher o campo Descrição!`,
                      whitespace: true,
                    },
                  ],
                })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Descrição curta">
                {getFieldDecorator('shortDescription', {
                  initialValue: product.shortDescription,
                  rules: [
                    {
                      required: true,
                      message: `Favor, preencher o campo Descrição curta!`,
                      whitespace: true,
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row
            type="flex"
            align="middle"
            gutter={24}
            className="input-multiple-product"
          >
            <Col span={7}>
              <Form.Item label="Palavras Chave">
                {getFieldDecorator('keyWords', {
                  initialValue: product.keyWords,
                  rules: [
                    {
                      required: true,
                      message: `Favor, preencher o campo Palavras Chave!`,
                    },
                  ],
                })(
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    // onChange={handleChange}
                    tokenSeparators={[',']}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="Meta tags">
                {getFieldDecorator('metaTags', {
                  initialValue: product.metaTags,
                  rules: [
                    {
                      required: true,
                      message: `Favor, preencher o campo Meta Tags!`,
                    },
                  ],
                })(
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    // onChange={handleChange}
                    tokenSeparators={[',']}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Categoria">
                {getFieldDecorator('category', {
                  initialValue: category.name,
                  rules: [
                    {
                      required: true,
                      message: `Favor, preencher o campo Categoria!`,
                    },
                  ],
                })(
                  <Select
                    showSearch
                    filterOption={false}
                    notFoundContent={
                      categoriesIsLoading ? <Spin size="small" /> : null
                    }
                    onSearch={this.handleCategorySelectSearch}
                    onSelect={this.handleSelectCategory}
                  >
                    {categories.map((categoryItem) => (
                      <Select.Option
                        key={categoryItem.id}
                        title={categoryItem.name}
                      >
                        {categoryItem.name}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Situação">
                {getFieldDecorator('cured', {})(
                  <RadioGroup>
                    <Radio value={1}>Curado</Radio>
                    <Radio value={2}>Não Curado</Radio>
                  </RadioGroup>,
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

const mapStateToProps = createStructuredSelector({
  categories: categoriesSelectors.makeSelectCategories(),
  categoriesIsLoading: categoriesSelectors.makeSelectCategoriesIsLoading(),

  brands: brandsSelectors.makeSelectBrands(),
  brandsIsLoading: brandsSelectors.makeSelectBrandsIsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...categoriesActions,
      ...brandsActions,
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
)(ProductDataForm);
