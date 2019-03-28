import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty, debounce } from 'lodash';
import { Row, Col, Form, Input, Button, Select, Spin } from 'antd';

import {
  channelsActions,
  channelsSelectors,
} from '../../../../../../../state/ducks/channels';
import {
  brandsActions,
  brandsSelectors,
} from '../../../../../../../state/ducks/brands';
import {
  categoriesActions,
  categoriesSelectors,
} from '../../../../../../../state/ducks/categories';

import StyledFormItem from '../../../../../../components/StyledFormItem';
import StyledButtonFilter from '../../../../../../components/StyledButtonFilter';

const { Option } = Select;

class FilterForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,

    brands: PropTypes.array.isRequired,
    brandsIsLoading: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    categoriesIsLoading: PropTypes.bool.isRequired,
    channels: PropTypes.array.isRequired,
    channelsIsLoading: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleBrandSelectSearch = debounce(this.handleBrandSelectSearch);
    this.handleCategorySelectSearch = debounce(this.handleCategorySelectSearch);
    this.handleChannelSelectSearch = debounce(this.handleChannelSelectSearch);
  }

  state = {};

  componentDidMount() {
    this.fetchBrands();
    this.fetchCategories();
    this.fetchChannels();
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

  render() {
    const {
      form: { getFieldDecorator },
      brands,
      brandsIsLoading,
      categories,
      categoriesIsLoading,
      channels,
      channelsIsLoading,
      onSubmit,
      loading,
    } = this.props;

    return (
      <div className="form-filter">
        <Row type="flex" justify="space-between">
          <h3>Filtros</h3>
          <Button className="btn-clear">Limpar</Button>
        </Row>
        <Form className="form-filters" layout="vertical">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
              <StyledFormItem label="Nome:">
                {getFieldDecorator('name', { initialValue: '' })(<Input />)}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={24} className="tags">
              <StyledFormItem label="Marcas:">
                {getFieldDecorator('idsBrands', { initialValue: [] })(
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
            <Col xs={24} sm={24} md={12} lg={12} xl={24} className="tags">
              <StyledFormItem label="Canal de Venda:">
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
                      <Option key={channel.id} title={channel.description}>
                        {channel.description}
                      </Option>
                    ))}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={24}>
              <StyledFormItem label="Dono do produto:">
                {getFieldDecorator('status', { initialValue: '' })(<Input />)}
              </StyledFormItem>
            </Col>
          </Row>
          <Form.Item>
            <StyledButtonFilter
              onClick={onSubmit}
              loading={loading}
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
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...brandsActions,
      ...categoriesActions,
      ...channelsActions,
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
