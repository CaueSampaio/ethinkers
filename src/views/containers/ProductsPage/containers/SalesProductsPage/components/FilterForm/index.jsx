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
import { categoriesActions } from '../../../../../../../state/ducks/categories';

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
  };

  constructor(props) {
    super(props);
    this.handleBrandSelectSearch = debounce(this.handleBrandSelectSearch, 800);
  }

  state = {
    brandSearch: null,
  };

  componentDidMount() {
    this.fetchBrands();
  }

  componentWillUnmount() {
    const {
      actions: { clearBrands },
    } = this.props;
    clearBrands();
  }

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
      brands,
      brandsIsLoading,
      form: { getFieldDecorator },
    } = this.props;
    const children = [];

    return (
      <div className="form-filter">
        <Row type="flex" justify="space-between">
          <h3>Filtros</h3>
          <Button className="btn-clear">Limpar</Button>
        </Row>
        <Form className="form-filters" layout="vertical">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
              <StyledFormItem label="Código do produto:">
                {getFieldDecorator('orderNumber', {})(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    // onChange={handleChange}
                  >
                    {children}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
              <StyledFormItem label="Nome:">
                {getFieldDecorator('name', {})(<Input />)}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
              <StyledFormItem label="Marcas:">
                {getFieldDecorator('idsBrand', {})(
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
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
              <StyledFormItem label="Categorias:">
                {getFieldDecorator('idsCategories', {})(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    // onChange={handleChange}
                  >
                    {children}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
              <StyledFormItem label="Canal de Venda:">
                {getFieldDecorator('idsChannels', {})(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    // onChange={handleChange}
                  >
                    {children}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={24}>
              <StyledFormItem label="Ref do Produto:">
                {getFieldDecorator('refsProducts', {})(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    // onChange={handleChange}
                  >
                    {children}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={24}>
              <StyledFormItem label="Empresa fornecedora:">
                {getFieldDecorator('idsCompanies', {})(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    // onChange={handleChange}
                  >
                    {children}
                  </Select>,
                )}
              </StyledFormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={24}>
              <StyledFormItem label="Status:">
                {getFieldDecorator('status', {})(<Input />)}
              </StyledFormItem>
            </Col>
          </Row>
          <Form.Item>
            <StyledButtonFilter text="Buscar" />
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
  brandsError: brandsSelectors.makeSelectBrandsError(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { ...brandsActions, ...categoriesActions },
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
