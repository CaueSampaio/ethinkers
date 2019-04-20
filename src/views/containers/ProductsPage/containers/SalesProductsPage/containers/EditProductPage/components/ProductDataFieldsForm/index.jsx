import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty, debounce } from 'lodash';
import {
  Form,
  Divider,
  Row,
  Col,
  Input,
  Select,
  Button,
  Spin,
  Checkbox,
  Card,
  Avatar,
} from 'antd';

import {
  channelsActions,
  channelsSelectors,
} from '../../../../../../../../../state/ducks/channels';
import {
  channelProductsActions,
  channelProductsSelectors,
  channelProductsConstants,
} from '../../../../../../../../../state/ducks/channelProducts';
import {
  channelCategoriesActions,
  channelCategoriesSelectors,
} from '../../../../../../../../../state/ducks/channelCategories';

import integrationErrorIc from '../../../../../../../../../assets/images/integration-error.svg';

import './style.less';

const { TextArea } = Input;

class EditProductPage extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,

    onSubmit: PropTypes.func.isRequired,
    categories: PropTypes.array,
    categoriesIsLoading: PropTypes.bool.isRequired,
    brands: PropTypes.array.isRequired,
    brandsIsLoading: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    product: PropTypes.object.isRequired,
    categoriesAttributes: PropTypes.array,
    findChannelProduct: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleCategorySelectSearch = debounce(
      this.handleCategorySelectSearch,
      800,
    );
    this.handleBrandSelectSearch = debounce(this.handleBrandSelectSearch, 800);
  }

  state = {
    categorySearch: null,
    brandSearch: null,
    checkedCured: false,
  };

  componentDidMount = async () => {
    const {
      match: {
        params: { id },
      },
      findChannelProduct,
    } = this.props;
    await findChannelProduct(id);
    await this.fetchBrands();
    await this.fetchCategories();
  };

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

  handleBrandSelectSearch = async (value) => {
    await this.setState({
      brandSearch: isEmpty(value) ? null : value,
    });
    this.fetchBrands();
  };

  fetchBrands = async () => {
    const {
      actions: { listBrands, clearBrands },
      product: { idChannel },
    } = this.props;
    const { brandSearch } = this.state;
    await clearBrands();
    await listBrands(
      idChannel,
      isEmpty(brandSearch) ? null : { search: brandSearch },
    );
  };

  fetchCategories = async () => {
    const {
      actions: { listCategories, clearCategories },
      product: { idChannel },
    } = this.props;
    const { categorySearch } = this.state;

    await clearCategories();
    await listCategories(
      idChannel,
      isEmpty(categorySearch) ? null : { search: categorySearch },
    );
  };

  handleSelectCategory = async (value) => {
    const {
      actions: { listAllCategoryAttributeChannelId },
    } = this.props;
    listAllCategoryAttributeChannelId(value);
  };

  handleChangeCured = (e) => {
    this.setState({
      checkedCured: e.target.checked,
    });
  };

  render() {
    const {
      onSubmit,
      form: { getFieldDecorator },
      categories,
      categoriesIsLoading,
      isLoading,
      brands,
      brandsIsLoading,
      categoriesAttributes,
      // attributesIsLoading,
      product,
      product: {
        channelProductAttributes = [],
        channelBrand = {},
        channelCategory = {},
        integrationErrors = [],
        status,
      },
    } = this.props;
    const { checkedCured } = this.state;
    const {
      channelProductStatus,
      channelProductUpdateStatus,
    } = channelProductsConstants;

    return (
      <Fragment>
        {product.integrationErrors ? (
          <Row type="flex" gutter={16} align="middle">
            <Col span={24}>
              <span>Erros na Integração:</span>
            </Col>
            {integrationErrors.map((error, i) => (
              // eslint-disable-next-line
              <Col xs={24} sm={24} md={12} lg={12} xl={8} key={i}>
                <Card className="card-error-integration">
                  <Card.Meta
                    avatar={<Avatar src={integrationErrorIc} size="small" />}
                    description={error}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          ''
        )}
        <Divider orientation="left">Produto</Divider>
        <Row type="flex" gutter={24}>
          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <span className="label term">Status</span>
            <span className="detail">
              <span key={product.status}>
                {channelProductStatus.map(
                  (item) => item.value === product.status && item.status,
                )}
              </span>
            </span>
          </Col>
          {product.updateStatus ? (
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <span className="label term">Status Atualização</span>
              <span className="detail">
                <span key={product.updateStatus}>
                  {channelProductUpdateStatus.map(
                    (item) =>
                      item.value === product.updateStatus && item.status,
                  )}
                </span>
              </span>
            </Col>
          ) : (
            ''
          )}
        </Row>
        <Form onSubmit={onSubmit}>
          <Row gutter={24} className="input-multiple-product">
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
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
                })(<Input maxLength={150} />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <Form.Item label="Marca:">
                {getFieldDecorator('idChannelBrand', {
                  initialValue: !isEmpty(brands) ? channelBrand.id : '',
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
                    maxLength={100}
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
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
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
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
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
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
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
          <Row gutter={24} className="input-multiple-product">
            {status === 0 && (
              <Col xs={24} sm={24} md={6} lg={6} xl={4}>
                <Form.Item label="Situação">
                  {getFieldDecorator('cured', {})(
                    <Checkbox
                      checked={checkedCured}
                      onChange={this.handleChangeCured}
                    >
                      <span>Curado</span>
                    </Checkbox>,
                  )}
                </Form.Item>
              </Col>
            )}
            {status === 1 && (
              <Col xs={24} sm={24} md={6} lg={6} xl={4}>
                <Form.Item label="Situação">
                  {getFieldDecorator('uncured', {})(
                    <Checkbox
                      checked={checkedCured}
                      onChange={this.handleChangeCured}
                    >
                      <span>Não Curado</span>
                    </Checkbox>,
                  )}
                </Form.Item>
              </Col>
            )}
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
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
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <Form.Item label="Categoria">
                {getFieldDecorator('idChannelCategory', {
                  initialValue: !isEmpty(categories) ? channelCategory.id : '',
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
                    maxLength={100}
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
            {!isEmpty(channelProductAttributes) &&
              channelProductAttributes.map((attribute, i) => (
                <Col xs={24} sm={24} md={12} lg={12} xl={8} key={attribute.id}>
                  <Form.Item label="Atributo 1">
                    {getFieldDecorator(`attributes[${i}].value`, {})(<Input />)}
                  </Form.Item>
                </Col>
              ))}
            {!isEmpty(categoriesAttributes) &&
              categoriesAttributes.map(
                ({ id, values, type, required, description }, i) =>
                  type === 0 && (
                    <Col span={8} key={id}>
                      <Form.Item label={description}>
                        {getFieldDecorator(
                          `attributes[${i}]`,
                          required
                            ? {
                                rules: [
                                  {
                                    required: true,
                                    message: `Favor, preencher o campo ${description}!`,
                                  },
                                ],
                              }
                            : {},
                        )(
                          !isEmpty(values) ? (
                            <Select>
                              {values.map((value) => (
                                <Select.Option key={value.id}>
                                  {value.description}
                                </Select.Option>
                              ))}
                            </Select>
                          ) : (
                            <Input />
                          ),
                        )}
                      </Form.Item>
                    </Col>
                  ),
              )}
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

const withForm = Form.create();

const mapStateToProps = createStructuredSelector({
  product: channelProductsSelectors.makeSelectFindChannelProduct(),
  productIsLoading: channelProductsSelectors.makeSelectFindChannelProductIsLoading(),

  brands: channelsSelectors.makeSelectChannelBrands(),
  brandsIsLoading: channelsSelectors.makeSelectChannelBrandsIsLoading(),

  categories: channelsSelectors.makeSelectChannelCategories(),
  categoriesIsLoading: channelsSelectors.makeSelectChannelCategoriesIsLoading(),

  categoriesAttributes: channelCategoriesSelectors.makeSelectCategoriesAttributes(),
  categoriesAttributesIsLoading: channelCategoriesSelectors.makeSelectCategoriesAttributesIsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...channelsActions,
      ...channelCategoriesActions,
      ...channelProductsActions,
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
