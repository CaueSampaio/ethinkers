/* eslint-disable */
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
  Spin,
  Divider,
  notification,
  Empty,
} from 'antd';

import {
  skusActions,
  skusSelectors,
} from '../../../../../../../state/ducks/skus';
import {
  categoriesActions,
  categoriesSelectors,
} from '../../../../../../../state/ducks/categories';
import {
  brandsActions,
  brandsSelectors,
} from '../../../../../../../state/ducks/brands';
import {
  productsActions,
  productsSelectors,
} from '../../../../../../../state/ducks/products';

import StyledFormItem from '../../../../../../components/StyledFormItem';
import SkuModalForm from '../SkuModalForm';
import SkuDataItem from '../SkuDataItem';
import BadRequestNotificationBody from '../../../../../../components/BadRequestNotificationBody';

import './style.less';

const { TextArea } = Input;

class AvailableProductForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,

    categories: PropTypes.array.isRequired,
    categoriesIsLoading: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    brands: PropTypes.array.isRequired,
    brandsIsLoading: PropTypes.bool.isRequired,
    createProductError: PropTypes.object,
    createSkuError: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.filterCategories = debounce(this.fetchCategories, 800);
    this.filterBrands = debounce(this.fetchBrands, 800);
  }

  state = {
    visibleModal: false,
    skusList: [],
    showImageSku: true,
    skuImages: [],
  };

  componentDidMount() {
    this.fetchCategories();
    this.fetchBrands();
  }

  showSkuModal = () => {
    this.setState({
      visibleModal: true,
      showImageSku: false,
    });
  };

  handleCancel = async () => {
    const { resetFields, setFieldsValue } = this.formRef;
    await this.setState({
      visibleModal: false,
    });
    resetFields();
    this.setState({
      skuImages: [],
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

  removeSkuItem = (e, skuIndex) => {
    e.stopPropagation();
    this.setState({
      skusList: this.state.skusList.filter((_, i) => i !== skuIndex), // eslint-disable-line
    });
  };

  fetchBrands = async () => {
    const {
      actions: { listBrands, clearBrands },
    } = this.props;
    const { brandSearch } = this.state;
    await clearBrands();
    await listBrands(isEmpty(brandSearch) ? null : { search: brandSearch });
  };

  handleSubmitSku = async () => {
    const { validateFields, resetFields } = this.formRef;

    validateFields(async (err, values) => {
      if (err) return;
      this.setState({
        skusList: [...this.state.skusList, values], // eslint-disable-line
      });
      this.handleCancel();
      resetFields();
      this.setState({
        skuImages: [],
      });
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      actions: { createProduct, createSku },
      createProductError,
      createSkuError,
    } = this.props;
    const { skusList } = this.state;
    const {
      form: { validateFields },
    } = this.props;

    validateFields(async (err, values) => {
      if (err) return;
      const result = await createProduct(values);
      const {
        payload: { id, errorsMessage },
      } = result;

      if (!result.error) {
        let resultSku = {};
        await notification.success({
          message: 'Sucesso',
          description: 'Produto cadastrado com sucesso',
        });
        if (!isEmpty(skusList)) {
          const skus = skusList.map((sku) => ({ ...sku, idProduct: id }));
          const promisesList = skus.map(async (sku) => {
            resultSku = await createSku(sku);
            return resultSku;
          });
          Promise.all(promisesList).then((test) => {
            const error = test.filter((value, index) => {
              const containsError = Boolean(value.error);
              if (containsError) {
                return { index };
              }
              return false;
            });
            if (!isEmpty(error)) {
              console.log(resultSku);
              const {
                payload: { message },
              } = resultSku;
              notification.error({
                message: 'Erro ao cadastrar o SKU',
                description: <BadRequestNotificationBody errors={message} />,
              });
            } else {
              notification.success({
                message: 'Sucesso',
                description: 'SKU cadastrado com sucesso',
              });
            }
          });
        }
      } else {
        errorsMessage.map((error) => {
          error.errorsMessage.map((message) => {
            notification.error({
              message: 'Não foi possível concluir a ação',
              description: <BadRequestNotificationBody errors={message} />,
            });
          });
        });
      }
    });
  };

  getFormRef = (ref) => {
    this.formRef = ref;
  };

  handleChangeImageSku = async (e, k) => {
    e.persist();
    const { skuImages } = this.state;
    const newItems = [...skuImages];

    newItems[k] = e.target.value;
    await this.setState({ skuImages: newItems, changeUrl: true });
  };

  render() {
    const {
      form: { getFieldDecorator },
      isLoading,
      categories,
      categoriesIsLoading,
      brands,
      brandsIsLoading,
    } = this.props;
    const { visibleModal, skusList, showImageSku, skuImages } = this.state;
    const children = [];

    const genExtra = (skuIndex) => (
      <button
        type="submit"
        onClick={(e) => this.removeSkuItem(e, skuIndex)}
        className="btn-remove-sku"
      >
        <Icon type="delete" />
        remover
      </button>
    );

    return (
      <Fragment>
        <Form onSubmit={this.onSubmit}>
          <Row className="create-product-form" gutter={24} type="flex">
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
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
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
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
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StyledFormItem label="Marca:">
                {getFieldDecorator('idBrand', {
                  rules: [
                    {
                      required: true,
                      message: 'Favor, preencher o campo Marca!',
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
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
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
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
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
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
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
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
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
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
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
          <Row type="flex" justify="space-between" gutter={10} align="middle">
            <Col xs={10} sm={16} md={18} lg={18} xl={20}>
              <Divider orientation="left">SKUS</Divider>
            </Col>
            <Col xs={14} sm={8} md={6} lg={6} xl={4}>
              <Button
                style={{ borderRadius: 50 }}
                type="dashed"
                onClick={this.showSkuModal}
                className="add-sku"
              >
                <Icon type="plus" />
                <span>Adicionar SKU</span>
              </Button>
            </Col>
          </Row>
          <Row gutter={24}>
            {!isEmpty(skusList) ? (
              skusList.map((sku, i) => (
                <Col span={24} key={i}>
                  <SkuDataItem
                    sku={sku}
                    removeSkuItem={this.removeSkuItem}
                    genExtra={genExtra(i)}
                  />
                </Col>
              ))
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="A lista de SKUS está vazia"
              />
            )}
          </Row>
          <Row type="flex" justify="end" gutter={8} style={{ marginTop: 30 }}>
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
                  disabled={skusList.length <= 0}
                >
                  <span>Cadastrar</span>
                </Button>
              </StyledFormItem>
            </Col>
          </Row>
        </Form>
        <SkuModalForm
          visible={visibleModal}
          onCancel={this.handleCancel}
          ref={this.getFormRef}
          onSubmitSku={this.handleSubmitSku}
          showImage={showImageSku}
          handleChangeImage={this.handleChangeImageSku}
          skuImages={skuImages}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categories: categoriesSelectors.makeSelectCategories(),
  categoriesIsLoading: categoriesSelectors.makeSelectCategoriesIsLoading(),

  brands: brandsSelectors.makeSelectBrands(),
  brandsIsLoading: brandsSelectors.makeSelectBrandsIsLoading(),

  createProductError: productsSelectors.makeSelectCreateProductError(),

  createSkuError: skusSelectors.makeSelectCreateSkuError(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...categoriesActions,
      ...brandsActions,
      ...productsActions,
      ...skusActions,
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
