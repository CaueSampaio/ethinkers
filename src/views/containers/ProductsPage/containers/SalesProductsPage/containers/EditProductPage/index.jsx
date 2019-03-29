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
    editProductError: PropTypes.object,
    editProductIsLoading: PropTypes.bool.isRequired,
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { validateFields } = this.formRef;
    const {
      match: {
        params: { id: idProduct },
      },
      actions: { editChannelProduct, findChannelProduct },
      editProductError,
    } = this.props;

    validateFields(async (err, values) => {
      const result = await editChannelProduct(idProduct, values);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'Produto atualizado com sucesso',
        });
        await findChannelProduct(idProduct);
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
    const { product, editProductIsLoading } = this.props;

    return (
      <Fragment>
        <PrivatePageHeader title="Editar Produto" />
        <PrivatePageSection>
          <ProductDataFieldsForm
            product={product}
            onSubmit={this.handleSubmit}
            ref={this.getFormRef}
            isLoading={editProductIsLoading}
          />
        </PrivatePageSection>
        <PrivatePageSection>
          <SkusDataList product={product} />
        </PrivatePageSection>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  product: channelProductsSelectors.makeSelectFindChannelProduct(),
  productIsLoading: channelProductsSelectors.makeSelectFindChannelProductIsLoading(),

  editProductError: channelProductsSelectors.makeSelectEditChannelProductError(),
  editProductIsLoading: channelProductsSelectors.makeSelectEditChannelProductIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(channelProductsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditProductPage);
