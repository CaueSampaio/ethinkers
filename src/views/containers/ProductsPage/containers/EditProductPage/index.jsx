import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Form, Button, Row, Col } from 'antd';

import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../state/ducks/channelProducts';

import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PrivatePageSection from '../../../../components/PrivatePageSection';
import ProductDataFieldsForm from './components/ProductDataFieldsForm';

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

  render() {
    const { product } = this.props;

    return (
      <Fragment>
        <PrivatePageHeader title="Editar Produto" />
        <PrivatePageSection>
          <Form>
            <ProductDataFieldsForm product={product} />
            <Row
              type="flex"
              justify="end"
              gutter={12}
              style={{ marginTop: 20 }}
            >
              <Col>
                <Form.Item>
                  <Button style={{ borderRadius: 50 }} type="ghost">
                    <span>Cancelar</span>
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button style={{ borderRadius: 50 }} type="primary">
                    <span>Atualizar</span>
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </PrivatePageSection>
      </Fragment>
    );
  }
}

const withForm = Form.create();

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

export default compose(
  withForm,
  withConnect,
)(EditProductPage);
