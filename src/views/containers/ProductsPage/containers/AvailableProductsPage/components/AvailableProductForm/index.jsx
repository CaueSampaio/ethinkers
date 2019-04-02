import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty, debounce } from 'lodash';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Icon,
  Tooltip,
  Spin,
} from 'antd';

import {
  categoriesActions,
  categoriesSelectors,
} from '../../../../../../../state/ducks/categories';
import {
  brandsActions,
  brandsSelectors,
} from '../../../../../../../state/ducks/brands';

import StyledFormItem from '../../../../../../components/StyledFormItem';
import SkuModalForm from '../SkuModalForm';

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
    createSkuAction: PropTypes.bool.isRequired,
    brands: PropTypes.array.isRequired,
    brandsIsLoading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.filterCategories = debounce(this.fetchCategories, 800);
    this.filterBrands = debounce(this.fetchBrands, 800);
  }

  state = { visibleModal: false };

  componentDidMount() {
    this.fetchCategories();
    this.fetchBrands();
  }

  showSkuModal = () => {
    this.setState({
      visibleModal: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visibleModal: false,
    });
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

  handleCategorySelectSearch = async (value) => {
    await this.setState({
      categorySearch: isEmpty(value) ? null : value,
    });
    this.fetchCategories();
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
      isLoading,
      onSubmit,
      categories,
      categoriesIsLoading,
      createSkuAction,
      brands,
      brandsIsLoading,
    } = this.props;
    const { visibleModal } = this.state;

    const children = [];

    return (
      <Fragment>
        <Form onSubmit={onSubmit}>
          <Row className="create-product-form" gutter={24} type="flex">
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <StyledFormItem label="Nome">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Favor, preencher o nome!',
                    },
                  ],
                })(<Input />)}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <StyledFormItem label="Ref do Produto">
                {getFieldDecorator('refProduct', {
                  rules: [
                    {
                      required: true,
                      message: 'Favor, preencher a REF!',
                    },
                  ],
                })(<Input />)}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <StyledFormItem label="Marca:">
                {getFieldDecorator('brand', {
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
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <StyledFormItem label="Descrição longa">
                {getFieldDecorator('longDescription', {
                  rules: [
                    {
                      required: true,
                      message: 'Favor, preencher a descrição longa!',
                    },
                  ],
                })(<TextArea rows={3} />)}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <StyledFormItem label="Descrição curta">
                {getFieldDecorator('shortDescription', {
                  rules: [
                    {
                      required: true,
                      message: 'Favor, preencher a descrição curta!',
                    },
                  ],
                })(<TextArea autosize={{ minRows: 2, maxRows: 2 }} />)}
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <StyledFormItem
                className="input-multiple-product"
                label="Meta Tags"
              >
                {getFieldDecorator('metaTags', {
                  rules: [
                    {
                      required: true,
                      message: 'Favor, preencher as Meta Tags!',
                    },
                  ],
                })(
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
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <StyledFormItem
                className="input-multiple-product "
                label="Palavras Chave"
              >
                {getFieldDecorator('keyWords', {
                  rules: [
                    {
                      required: true,
                      message: 'Favor, preencher as palavras chave!',
                    },
                  ],
                })(
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
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <StyledFormItem label="Categoria">
                {getFieldDecorator('idCategory', {
                  rules: [
                    {
                      required: true,
                      message: 'Favor, preencher a Categoria!',
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
          <Row gutter={24}>
            <Col>
              <Button
                style={{ borderRadius: 50 }}
                type="dashed"
                onClick={this.showSkuModal}
                disabled={createSkuAction}
              >
                <Icon type="plus" />
                <span>Cadastrar SKU</span>
              </Button>
              {createSkuAction ? (
                <Tooltip
                  placement="top"
                  title="O cadastro do SKU será possível somente após o cadastro do Produto."
                >
                  <Icon
                    type="question-circle"
                    style={{ marginLeft: 10, fontSize: 16 }}
                  />
                </Tooltip>
              ) : null}
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
                  <span>Cadastrar</span>
                </Button>
              </StyledFormItem>
            </Col>
          </Row>
        </Form>
        <SkuModalForm visible={visibleModal} onCancel={this.handleCancel} />
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
)(AvailableProductForm);
