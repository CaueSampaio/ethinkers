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
import AvailableProductForm from '../../components/AvailableProductForm';
import BadRequestNotificationBody from '../../../../../../components/BadRequestNotificationBody';

class CreateProductPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    createProductIsLoading: PropTypes.bool.isRequired,
    createProductError: PropTypes.object,
  };

  state = {};

  getFormRef = (ref) => {
    this.formRef = ref;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      history: { push },
      actions: { createProduct },
      createProductError,
    } = this.props;
    const { validateFields } = this.formRef;

    validateFields(async (err, values) => {
      if (err) return;
      const result = await createProduct(values);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'Produto cadastrado com sucesso',
        });
        push('/products/available');
      } else {
        const { message: errorMessage, errors } = createProductError;
        notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
      }
    });
  };

  render() {
    const { createProductIsLoading } = this.props;

    return (
      <Fragment>
        <PrivatePageHeader title="Cadastrar Produto" />
        <PrivatePageSection>
          <AvailableProductForm
            ref={this.getFormRef}
            isLoading={createProductIsLoading}
            onSubmit={this.onSubmit}
          />
        </PrivatePageSection>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  createProductIsLoading: productsSelectors.makeSelectCreateProductIsLoading(),
  createProductError: productsSelectors.makeSelectCreateProductError(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...productsActions,
    },
    dispatch,
  ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateProductPage);
