import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { notification } from 'antd';

import {
  productsActions,
  productsSelectors,
} from '../../../../../../../state/ducks/products';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import PrivatePageHeader from '../../../../../../components/PrivatePageHeader';
import ProductDataForm from './components/ProductDataForm';
import SkuDataList from './components/SkuDataList';
import BadRequestNotificationBody from '../../../../../../components/BadRequestNotificationBody';

class EditAvailableProductPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    product: PropTypes.object,
    productIsLoading: PropTypes.bool.isRequired,
    editProductError: PropTypes.object,
    editProductIsLoading: PropTypes.bool.isRequired,
  };

  state = {};

  componentDidMount = async () => {
    const {
      actions: { findProduct },
      match: {
        params: { id },
      },
    } = this.props;
    findProduct(id);
  };

  handleSubmitProductData = (e) => {
    e.preventDefault();
    const { validateFields } = this.formRef;
    const {
      match: {
        params: { id: idProduct },
      },
      actions: { editProduct, findProduct },
      editProductError,
    } = this.props;

    validateFields(async (err, values) => {
      if (err) return;
      const result = await editProduct(idProduct, values);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'Produto atualizado com sucesso',
        });
        await findProduct(idProduct);
      } else {
        const { message: errorMessage, errors } = editProductError;
        notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
      }
    });
  };

  getFormRef = (ref) => {
    this.formRef = ref;
  };

  render() {
    const { product = {}, productIsLoading, editProductIsLoading } = this.props;

    return (
      <Fragment>
        <PrivatePageHeader title="Editar Produto" />
        <PrivatePageSection isLoading={productIsLoading}>
          <ProductDataForm
            ref={this.getFormRef}
            onSubmit={this.handleSubmitProductData}
            product={product}
            isLoading={editProductIsLoading}
          />
        </PrivatePageSection>
        <PrivatePageSection isLoading={productIsLoading}>
          <SkuDataList product={product} />
        </PrivatePageSection>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  product: productsSelectors.makeSelectFindProduct(),
  productIsLoading: productsSelectors.makeSelectFindProductIsLoading(),

  editProductIsLoading: productsSelectors.makeSelectEditProductIsLoading(),
  editProductError: productsSelectors.makeSelectEditProductError(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(productsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditAvailableProductPage);
