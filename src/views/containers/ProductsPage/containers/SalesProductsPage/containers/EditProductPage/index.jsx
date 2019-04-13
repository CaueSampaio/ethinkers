import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { notification } from 'antd';

import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../../../state/ducks/channelProducts';
import {
  channelCategoriesActions,
  channelCategoriesSelectors,
} from '../../../../../../../state/ducks/channelCategories';

import { getHeaderResourceName } from '../../../../../../../utils';

import PrivatePageHeader from '../../../../../../components/PrivatePageHeader';
import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import BadRequestNotificationBody from '../../../../../../components/BadRequestNotificationBody';
import ProductDataFieldsForm from './components/ProductDataFieldsForm';
import SkusDataList from './components/SkusDataList';

class EditProductPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,

    product: PropTypes.object.isRequired,
    productIsLoading: PropTypes.bool.isRequired,
    editProductIsLoading: PropTypes.bool.isRequired,
    categoriesAttributes: PropTypes.array,
  };

  state = {};

  componentDidMount = async () => {
    const {
      actions: { findChannelProduct },
      match: {
        params: { id },
      },
    } = this.props;
    findChannelProduct(id);
  };

  renderResourceMap = () => {
    const { product } = this.props;

    return [getHeaderResourceName(product, 'name', 'id')];
  };

  getParams = (values) => {
    const params = {
      name: values.name,
      idChannelBrand: values.idChannelBrand,
      idChannelCategory: values.idChannelCategory,
      keyWords: values.keyWords,
      longDescription: values.longDescription,
      metaTags: values.metaTags,
      shortDescription: values.shortDescription,
      attributes: values.attributes,
    };

    const paramsWithCured = {
      ...values,
      cured: true,
    };
    const paramsWithUncured = {
      ...values,
      cured: false,
    };
    if (values.cured === true) {
      return paramsWithCured;
    }
    if (values.uncured === true) {
      return paramsWithUncured;
    }
    return params;
  };

  handleSubmitProductData = (e) => {
    e.preventDefault();
    const { validateFields } = this.formRef;
    const {
      match: {
        params: { id: idProduct },
      },
      actions: { editChannelProduct, findChannelProduct },
    } = this.props;

    validateFields(async (err, values) => {
      if (err) return;

      const result = await editChannelProduct(
        idProduct,
        this.getParams(values),
      );

      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'Produto atualizado com sucesso',
        });
        await findChannelProduct(idProduct);
      } else {
        const {
          payload: { message, errors },
        } = result;
        notification.error({
          message,
          description: <BadRequestNotificationBody errors={errors} />,
        });
      }
    });
  };

  getFormRef = (ref) => {
    this.formRef = ref;
  };

  render() {
    const {
      product,
      editProductIsLoading,
      categoriesAttributes,
      productIsLoading,
      actions: { findChannelProduct },
      match,
    } = this.props;

    return (
      <Fragment>
        <PrivatePageHeader
          title="Editar Produto"
          resourceMap={this.renderResourceMap()}
        />
        <PrivatePageSection isLoading={productIsLoading}>
          <ProductDataFieldsForm
            // product={product}
            onSubmit={this.handleSubmitProductData}
            ref={this.getFormRef}
            isLoading={editProductIsLoading}
            findChannelProduct={findChannelProduct}
            match={match}
          />
        </PrivatePageSection>
        <PrivatePageSection isLoading={productIsLoading}>
          <SkusDataList
            product={product}
            categoriesAttributes={categoriesAttributes}
            ref={this.getFormSkuRef}
          />
        </PrivatePageSection>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  product: channelProductsSelectors.makeSelectFindChannelProduct(),
  productIsLoading: channelProductsSelectors.makeSelectFindChannelProductIsLoading(),

  editProductIsLoading: channelProductsSelectors.makeSelectEditChannelProductIsLoading(),

  categoriesAttributes: channelCategoriesSelectors.makeSelectCategoriesAttributes(),
  categoriesAttributesIsLoading: channelCategoriesSelectors.makeSelectCategoriesAttributesIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { ...channelProductsActions, ...channelCategoriesActions },
    dispatch,
  ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditProductPage);
