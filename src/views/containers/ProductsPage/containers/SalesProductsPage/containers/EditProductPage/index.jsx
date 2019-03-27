import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../../../state/ducks/channelProducts';

import PrivatePageHeader from '../../../../../../components/PrivatePageHeader';
import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import ProductDataFieldsForm from './components/ProductDataFieldsForm';
import SkusDataList from './components/SkusDataList';

class EditProductPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,

    product: PropTypes.object.isRequired,
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
    console.log(this.formRef);
    validateFields(async (err, values) => {
      console.log(values);
    });
  };

  getFormRef = (ref) => {
    this.formRef = ref;
  };

  render() {
    const { product } = this.props;

    return (
      <Fragment>
        <PrivatePageHeader title="Editar Produto" />
        <PrivatePageSection>
          <ProductDataFieldsForm
            product={product}
            onSubmit={this.handleSubmit}
            ref={this.getFormRef}
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
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(channelProductsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditProductPage);
