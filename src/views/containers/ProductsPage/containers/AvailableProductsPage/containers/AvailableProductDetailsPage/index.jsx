import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  productsActions,
  productsSelectors,
} from '../../../../../../../state/ducks/products';

import { getHeaderResourceName } from '../../../../../../../utils';
import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import PrivatePageHeader from '../../../../../../components/PrivatePageHeader';

import SkuDataItem from '../../../../components/SkuDataItem';
import ProductDataItem from './components/ProductDataItem';

import './style.less';

class AvailableProductDetailsPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,

    product: PropTypes.object.isRequired,
    productIsLoading: PropTypes.bool.isRequired,
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

  renderResourceMap = () => {
    const { product } = this.props;

    return [getHeaderResourceName(product, 'name', 'id')];
  };

  renderHeaderContent = () => {
    const {
      product: { idProduct, status },
    } = this.props;

    return status === 0 ? (
      <div className="content-disabled-item">
        <span className="item-disabled">{`#${idProduct}`}</span>
        <span className="status-disabled">(Desabilitado)</span>
      </div>
    ) : (
      ''
    );
  };

  render() {
    const { product, productIsLoading } = this.props;
    console.log(productIsLoading);
    return (
      <Fragment>
        <PrivatePageHeader
          title="Detalhes do Produto"
          resourceMap={this.renderResourceMap()}
          content={this.renderHeaderContent()}
        />
        <PrivatePageSection isLoading={productIsLoading}>
          <ProductDataItem product={product} />
        </PrivatePageSection>
        <PrivatePageSection isLoading={productIsLoading}>
          <SkuDataItem product={product} />
        </PrivatePageSection>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  product: productsSelectors.makeSelectFindProduct(),
  productIsLoading: productsSelectors.makeSelectFindProductIsLoading(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(productsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AvailableProductDetailsPage);
