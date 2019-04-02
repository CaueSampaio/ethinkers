import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../../../state/ducks/channelProducts';

import { getHeaderResourceName } from '../../../../../../../utils';
import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import PrivatePageHeader from '../../../../../../components/PrivatePageHeader';
import ProductDataList from './components/ProductDataList';
import SkuDataList from './components/SkuDataList';

class SalesProductDetailsPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,

    channelProduct: PropTypes.object.isRequired,
    channelProductIsLoading: PropTypes.bool.isRequired,
    channelProductsIsLoading: PropTypes.bool.isRequired,
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
    const { channelProduct } = this.props;

    return [getHeaderResourceName(channelProduct, 'name', 'id')];
  };

  render() {
    const {
      channelProduct,
      channelProductIsLoading,
      channelProductsIsLoading,
    } = this.props;

    return (
      <Fragment>
        <PrivatePageHeader
          title="Detalhes do Produto"
          resourceMap={this.renderResourceMap()}
        />
        <PrivatePageSection
          isLoading={channelProductIsLoading || channelProductsIsLoading}
        >
          <ProductDataList channelProduct={channelProduct} />
        </PrivatePageSection>
        <PrivatePageSection
          isLoading={channelProductIsLoading || channelProductsIsLoading}
        >
          <SkuDataList channelProduct={channelProduct} />
        </PrivatePageSection>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  channelProduct: channelProductsSelectors.makeSelectFindChannelProduct(),
  channelProductIsLoading: channelProductsSelectors.makeSelectFindChannelProductIsLoading(),

  channelProducts: channelProductsSelectors.makeSelectChannelProducts(),
  channelProductsIsLoading: channelProductsSelectors.makeSelectChannelProductsIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(channelProductsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SalesProductDetailsPage);
