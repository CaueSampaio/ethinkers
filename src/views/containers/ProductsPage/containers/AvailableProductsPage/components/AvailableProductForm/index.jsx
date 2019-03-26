import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { debounce } from 'lodash';
import { Row, Col, Form, Input, Select, Button, AutoComplete } from 'antd';

import {
  categoriesActions,
  categoriesSelectors,
} from '../../../../../../../state/ducks/categories';

import StyledFormItem from '../../../../../../components/StyledFormItem';
import { SmallSpinner } from '../../../../../../components/MySpinner';

import './style.less';

const { Option } = Select;
const { TextArea } = Input;

class AvailableProductForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,

    onSubmit: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    categoriesIsLoading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.filterCategories = debounce(this.fetchCategories);
  }

  state = {};

  componentDidMount() {
    this.fetchCategories();
  }

  onCategoriesSearch = async (search) => {
    this.filterCategories(search);
  };

  onCategoriesSelect = async (value, element) => {
    const {
      actions: { listAllCategoryAttributeChannelId },
    } = this.props;
    const {
      props: { title: search },
    } = element;

    await this.filterCategories(search);
    await listAllCategoryAttributeChannelId(value);
  };

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
      onSubmit,
    } = this.props;
    const children = [];
    const { categories, categoriesIsLoading } = this.props;

    return (
      <Form onSubmit={onSubmit} className="create-product-form">
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <StyledFormItem label="Nome">
              {getFieldDecorator('name', {})(<Input />)}
            </StyledFormItem>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <StyledFormItem label="Ref do Produto">
              {getFieldDecorator('refProduct', {})(<Input />)}
            </StyledFormItem>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <StyledFormItem label="Marca">
              {getFieldDecorator('idBrand', {})(
                <Select>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>,
              )}
            </StyledFormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <StyledFormItem label="Descrição longa">
              {getFieldDecorator('longDescription', {})(<TextArea rows={3} />)}
            </StyledFormItem>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <StyledFormItem label="Descrição curta">
              {getFieldDecorator('shortDescription', {})(
                <TextArea autosize={{ minRows: 2, maxRows: 2 }} />,
              )}
            </StyledFormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <StyledFormItem label="Meta Tags">
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
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <StyledFormItem label="Palavras Chave">
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
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <StyledFormItem label="Categoria">
              {getFieldDecorator('idCategory', {})(
                <AutoComplete
                  onSearch={this.onCategoriesSearch}
                  onSelect={this.onCategoriesSelect}
                  optionLabelProp="title"
                  notFoundContent={
                    categoriesIsLoading ? <SmallSpinner /> : null
                  }
                >
                  {categories.map((item) => (
                    <AutoComplete.Option key={item.id} title={item.name}>
                      <span>{item.name}</span>
                    </AutoComplete.Option>
                  ))}
                </AutoComplete>,
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
