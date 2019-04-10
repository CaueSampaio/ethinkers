import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty, debounce } from 'lodash';
import { Row, Form, Input, Button, Select, Col, Spin } from 'antd';

import {
  brandsActions,
  brandsSelectors,
} from '../../../../../../../state/ducks/brands';
import {
  categoriesActions,
  categoriesSelectors,
} from '../../../../../../../state/ducks/categories';
import {
  channelsActions,
  channelsSelectors,
} from '../../../../../../../state/ducks/channels';
import {
  companiesActions,
  companiesSelectors,
} from '../../../../../../../state/ducks/companies';
import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../../../state/ducks/channelProducts';

import StyledFormItem from '../../../../../../components/StyledFormItem';
import StyledButtonFilter from '../../../../../../components/StyledButtonFilter';

import './style.less';

const { Option } = Select;

class FilterForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,

    brands: PropTypes.array.isRequired,
    brandsIsLoading: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    categoriesIsLoading: PropTypes.bool.isRequired,
    channels: PropTypes.array.isRequired,
    channelsIsLoading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    companies: PropTypes.array,
    companiesIsLoading: PropTypes.bool,
    updateStatus: PropTypes.array.isRequired,
    updateStatusIsLoading: PropTypes.bool.isRequired,
    status: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.handleBrandSelectSearch = debounce(this.handleBrandSelectSearch, 800);
    this.handleCategorySelectSearch = debounce(
      this.handleCategorySelectSearch,
      800,
    );
    this.handleChannelSelectSearch = debounce(
      this.handleChannelSelectSearch,
      800,
    );
  }

  state = {
    brandSearch: null,
    categorySearch: null,
    channelSearch: null,
    // refSearch: null,
    // companySearch: null
    statusSearch: null,
    companySearch: null,
    updateStatusSearch: null,
  };

  componentDidMount() {
    this.fetchBrands();
    this.fetchCategories();
    this.fetchChannels();
    this.fetchChannelsStatus();
    this.fetchCompanies();
    this.fetchUpdateStatus();
  }

  componentWillUnmount() {
    const {
      actions: { clearBrands, clearCategories, clearChannels },
    } = this.props;
    clearBrands();
    clearCategories();
    clearChannels();
  }

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

  handleChannelSelectSearch = async (value) => {
    await this.setState({
      channelSearch: isEmpty(value) ? null : value,
    });
    this.fetchChannels();
  };

  handleCompaniesSelectSearch = async (value) => {
    await this.setState({
      companySearch: isEmpty(value) ? null : value,
    });
    this.fetchCompanies();
  };

  handleUpdateStatusSelectSearch = async (value) => {
    await this.setState({
      updateStatusSearch: isEmpty(value) ? null : value,
    });
    this.fetchUpdateStatus();
  };

  fetchCompanies = async () => {
    const {
      actions: { listCompanies, clearCompanies },
    } = this.props;
    const { companySearch } = this.state;

    await clearCompanies();
    await listCompanies(
      isEmpty(companySearch) ? null : { search: companySearch },
    );
  };

  fetchUpdateStatus = async () => {
    const {
      actions: { listUpdateStatus, clearUpdateStatus },
    } = this.props;
    const { updateStatusSearch } = this.state;

    await clearUpdateStatus();
    await listUpdateStatus(
      isEmpty(updateStatusSearch) ? null : { search: updateStatusSearch },
    );
  };

  fetchBrands = async () => {
    const {
      actions: { listBrands, clearBrands },
    } = this.props;
    const { brandSearch } = this.state;
    await clearBrands();
    await listBrands(isEmpty(brandSearch) ? null : { search: brandSearch });
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

  fetchChannels = async () => {
    const {
      actions: { listChannels, clearChannels },
    } = this.props;
    const { channelSearch } = this.state;
    await clearChannels();
    await listChannels(
      isEmpty(channelSearch) ? null : { search: channelSearch },
    );
  };

  fetchChannelsStatus = async () => {
    const {
      actions: { listChannelProductsStatus, clearChannelsStatus },
    } = this.props;
    const { statusSearch } = this.state;
    await clearChannelsStatus();
    await listChannelProductsStatus(
      isEmpty(statusSearch) ? null : { search: statusSearch },
    );
  };

  clearFields = () => {
    const {
      form: { resetFields },
    } = this.props;
    resetFields();
  };

  render() {
    const {
      form: { getFieldDecorator },
      brands,
      brandsIsLoading,
      categories,
      categoriesIsLoading,
      channels,
      channelsIsLoading,
      companies,
      companiesIsLoading,
      onSubmit,
      loading,
      updateStatus,
      updateStatusIsLoading,
      status,
    } = this.props;
    const children = [];

    return (
      <div className="form-filter-container">
        <Row type="flex" justify="space-between">
          <h3>Filtros</h3>
          <Button className="btn-clear" onClick={this.clearFields}>
            <span>Limpar</span>
          </Button>
        </Row>
        <Form className="form-filters" layout="vertical">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={8} lg={8} xl={24} className="tags">
              <StyledFormItem label="Códigos dos produtos:">
                {getFieldDecorator('idsProducts', { initialValue: [] })(
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
            <Col xs={24} sm={24} md={8} lg={8} xl={24} className="tags">
              <StyledFormItem label="Referências do Produto:">
                {getFieldDecorator('refsProducts', { initialValue: [] })(
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
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
              <StyledFormItem label="Nome:">
                {getFieldDecorator('name', { initialValue: '' })(<Input />)}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={24} className="tags">
              <StyledFormItem label="Marcas:">
                {getFieldDecorator('idsBrand', { initialValue: [] })(
                  <Select
                    mode="multiple"
                    filterOption={false}
                    notFoundContent={
                      brandsIsLoading ? <Spin size="small" /> : null
                    }
                    onSearch={this.handleBrandSelectSearch}
                    style={{ width: '100%' }}
                  >
                    {brands.map((brand) => (
                      <Option key={brand.id} title={brand.name}>
                        {brand.name}
                      </Option>
                    ))}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={24} className="tags">
              <StyledFormItem label="Categorias:">
                {getFieldDecorator('idsCategories', { initialValue: [] })(
                  <Select
                    mode="multiple"
                    filterOption={false}
                    notFoundContent={
                      categoriesIsLoading ? <Spin size="small" /> : null
                    }
                    onSearch={this.handleCategorySelectSearch}
                    style={{ width: '100%' }}
                  >
                    {categories.map((category) => (
                      <Option key={category.id} title={category.name}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={8} lg={8} xl={24} className="tags">
              <StyledFormItem label="Canais de Venda:">
                {getFieldDecorator('idsChannels', { initialValue: [] })(
                  <Select
                    mode="multiple"
                    filterOption={false}
                    notFoundContent={
                      channelsIsLoading ? <Spin size="small" /> : null
                    }
                    onSearch={this.handleChannelSelectSearch}
                    style={{ width: '100%' }}
                  >
                    {channels.map((channel) => (
                      <Option key={channel.id} title={channel.name}>
                        {channel.name}
                      </Option>
                    ))}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={24} className="tags">
              <StyledFormItem label="Empresas fornecedoras:">
                {getFieldDecorator('idsCompanies', { initialValue: [] })(
                  <Select
                    mode="multiple"
                    filterOption={false}
                    notFoundContent={
                      companiesIsLoading ? <Spin size="small" /> : null
                    }
                    onSearch={this.handleCompaniesSelectSearch}
                    style={{ width: '100%' }}
                  >
                    {companies.map((company) => (
                      <Option key={company.id} title={company.name}>
                        {company.name}
                      </Option>
                    ))}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={24} className="tags">
              <StyledFormItem label="Status:">
                {getFieldDecorator('status', { initialValue: [] })(
                  <Select mode="multiple" style={{ width: '100%' }}>
                    {!isEmpty(status) &&
                      status.map((item) => (
                        <Option key={item.id} title={item.description}>
                          {item.description}
                        </Option>
                      ))}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={24} className="tags">
              <StyledFormItem label="Status Atualização:">
                {getFieldDecorator('updateStatus', { initialValue: [] })(
                  <Select
                    mode="multiple"
                    filterOption={false}
                    notFoundContent={
                      updateStatusIsLoading ? <Spin size="small" /> : null
                    }
                    onSearch={this.handleStatusSelectSearch}
                    style={{ width: '100%' }}
                  >
                    {updateStatus.map((item) => (
                      <Option key={item.id} title={item.description}>
                        {item.description}
                      </Option>
                    ))}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
          </Row>
          <Form.Item>
            <StyledButtonFilter
              loading={loading}
              onClick={onSubmit}
              text="Buscar"
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const withForm = Form.create();

const mapStateToProps = createStructuredSelector({
  brands: brandsSelectors.makeSelectBrands(),
  brandsIsLoading: brandsSelectors.makeSelectBrandsIsLoading(),

  categories: categoriesSelectors.makeSelectCategories(),
  categoriesIsLoading: categoriesSelectors.makeSelectCategoriesIsLoading(),

  channels: channelsSelectors.makeSelectChannels(),
  channelsIsLoading: channelsSelectors.makeSelectChannelsIsLoading(),

  channelsStatus: channelsSelectors.makeSelectChannelsStatus(),
  channelsStatusIsLoading: channelsSelectors.makeSelectChannelsStatusIsLoading(),

  companies: companiesSelectors.makeSelectCompanies(),
  companiesIsLoading: companiesSelectors.makeSelectCompaniesIsLoading(),

  updateStatus: channelProductsSelectors.makeSelectListUpdateStatus(),
  updateStatusIsLoading: channelProductsSelectors.makeSelectListUpdateStatusIsLoading(),
  updateStatusError: channelProductsSelectors.makeSelectListUpdateStatusError(),

  status: channelProductsSelectors.makeSelectListStatus(),
  statusIsLoading: channelProductsSelectors.makeSelectListStatusIsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...brandsActions,
      ...categoriesActions,
      ...channelsActions,
      ...companiesActions,
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
)(FilterForm);
