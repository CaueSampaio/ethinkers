import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  productsActions,
  productsSelectors,
} from '../../../../../../../state/ducks/products';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import PrivatePageHeader from '../../../../../../components/PrivatePageHeader';
import AvailableProductForm from '../../components/AvailableProductForm';

class CreateProductPage extends Component {
  static propTypes = {
    createProductIsLoading: PropTypes.bool.isRequired,
  };

  state = { createSkuAction: true };

  render() {
    const { createProductIsLoading } = this.props;
    const { createSkuAction } = this.state;

    return (
      <Fragment>
        <PrivatePageHeader title="Cadastrar Produto" />
        <PrivatePageSection>
          <AvailableProductForm
            isLoading={createProductIsLoading}
            createSkuAction={createSkuAction}
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
