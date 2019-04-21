/* eslint-disable */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Button, Icon } from 'antd';

import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../../../state/ducks/channelProducts';

import { getHeaderResourceName } from '../../../../../../../utils';
import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import PrivatePageHeader from '../../../../../../components/PrivatePageHeader';
import ProductDataList from './components/ProductDataList';
import SkuDataItem from '../../../../components/SkuDataItem';

let i = 0;

class ShippedBySellersProductDetailsPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,

    channelProduct: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      channelProduct: props.channelProduct,
      slide: true,
    };
  }

  state = {};

  componentDidMount = async () => {
    const {
      actions: { listChannelProducts },
    } = this.props;
    const params = {
      status: 3,
      updateStatus: 0,
    };
    listChannelProducts(params);
  };

  componentWillMount() {
    const {
      match: {
        params: { id },
      },
      actions: { findChannelProduct },
    } = this.props;
    findChannelProduct(id).then((response) => {
      const { payload } = response;
      this.setState({
        channelProduct: payload,
      });
    });
  }

  renderResourceMap = () => {
    const { channelProduct } = this.props;

    return [getHeaderResourceName(channelProduct, 'name', 'id')];
  };

  prevItem() {
    this.setState({
      slide: false,
    });
    const {
      channelProducts,
      actions: { findChannelProduct },
      history: { push },
    } = this.props;
    if (i === 0) {
      i = channelProducts.results.length;
    }
    i -= 1;
    findChannelProduct(channelProducts.results[i].idProduct).then(
      (response) => {
        this.setState({
          slide: true,
          channelProduct: response.payload,
        });
      },
    );
    push(`./${channelProducts.results[i].idProduct}`);
    return channelProducts.results[i];
  }

  nextItem() {
    this.setState({
      slide: false,
    });
    const {
      channelProducts,
      actions: { findChannelProduct },
      history: { push },
    } = this.props;
    i += 1;
    i %= channelProducts.results.length;
    findChannelProduct(channelProducts.results[i].idProduct).then(
      (response) => {
        this.setState({
          slide: true,
          channelProduct: response.payload,
        });
      },
    );
    push(`./${channelProducts.results[i].idProduct}`);
    return channelProducts.results[i];
  }

  render() {
    const { channelProduct } = this.state;
    const { channelProductIsLoading, channelProductsIsLoading } = this.props;

    return (
      <Fragment>
        <PrivatePageHeader
          title="Detalhes do Produto"
          resourceMap={this.renderResourceMap()}
        />
        <PrivatePageSection
          isLoading={channelProductIsLoading || channelProductsIsLoading}
        >
          <ProductDataList
            nextProduct={() => this.nextItem()}
            channelProduct={channelProduct}
          />
        </PrivatePageSection>
        <Row
          type="flex"
          gutter={16}
          justify="space-between"
          className="antd-pro-components-setting-drawer-index-handle btn-paginate"
          align="middle"
          style={{ marginTop: -25, width: '100%', marginLeft: 1 }}
        >
          <Button className="btn-prev" onClick={() => this.prevItem()}>
            <Icon type="left" />
          </Button>
          <Button className="btn-next" onClick={() => this.nextItem()}>
            <Icon type="right" />
          </Button>
        </Row>
        <PrivatePageSection
          isLoading={channelProductIsLoading || channelProductsIsLoading}
        >
          <SkuDataItem product={channelProduct} />
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

export default compose(withConnect)(ShippedBySellersProductDetailsPage);
