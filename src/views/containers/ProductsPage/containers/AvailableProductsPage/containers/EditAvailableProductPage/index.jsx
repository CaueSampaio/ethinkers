import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { notification, Row, Col, Divider, Button, Icon } from 'antd';

import {
  productsActions,
  productsSelectors,
} from '../../../../../../../state/ducks/products';
import {
  skusActions,
  skusSelectors,
} from '../../../../../../../state/ducks/skus';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import PrivatePageHeader from '../../../../../../components/PrivatePageHeader';
import ProductDataForm from './components/ProductDataForm';
import SkuDataList from './components/SkuDataList';
import CreateSkuModal from './components/CreateSkuModal';

import BadRequestNotificationBody from '../../../../../../components/BadRequestNotificationBody';

class EditAvailableProductPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    product: PropTypes.object,
    productIsLoading: PropTypes.bool.isRequired,
    editProductError: PropTypes.object,
    editProductIsLoading: PropTypes.bool.isRequired,
    editChannelSkusError: PropTypes.object.isRequired,
    editSkuIsLoading: PropTypes.bool.isRequired,
    createSkuIsLoading: PropTypes.bool.isRequired,
    createSkuError: PropTypes.object,
  };

  state = { showImageSku: true, skuImages: [], visibleModal: false };

  componentDidMount = async () => {
    const {
      actions: { findProduct },
      match: {
        params: { id },
      },
    } = this.props;
    findProduct(id);
  };

  showModal = () => {
    this.setState({
      visibleModal: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visibleModal: false,
      skuImages: [],
    });
  };

  handleChangeImageSku = async (e, k) => {
    e.persist();
    const { skuImages } = this.state;
    const newItems = [...skuImages];

    newItems[k] = e.target.value;
    await this.setState({ skuImages: newItems });
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

  handleEditSubmit = (e, idSku) => {
    e.preventDefault();
    const {
      actions: { editSku, findProduct },
      product: { id: idProduct },
      editChannelSkusError,
    } = this.props;
    const { validateFields } = this.formEditSku;

    validateFields(async (err, values) => {
      if (err) return;
      const result = await editSku(idSku, values);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'SKU atualizado com sucesso',
        });
        await findProduct(idProduct);
      } else {
        const { message: errorMessage, errors } = editChannelSkusError;
        notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
      }
    });
  };

  handleSubmitCreateSku = (e) => {
    e.preventDefault();
    const {
      actions: { createSku, findProduct },
      match: {
        params: { id },
      },
      createSkuError,
    } = this.props;
    const { validateFields, resetFields } = this.formCreateSku;

    validateFields(async (err, values) => {
      if (err) return;
      const params = {
        ...values,
        idProduct: id,
      };
      const result = await createSku(params);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'SKU cadastrado com sucesso',
        });
        this.handleCancel();
        await findProduct(id);
        resetFields();
        this.setState({
          skuImages: [],
        });
      } else {
        const { message: errorMessage, errors } = createSkuError;
        await notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
        this.handleCancel();
        resetFields();
        this.setState({
          skuImages: [],
        });
      }
    });
  };

  getFormRef = (ref) => {
    this.formRef = ref;
  };

  getFormEditSku = (ref) => {
    this.formEditSku = ref;
  };

  getFormCreateSku = (ref) => {
    this.formCreateSku = ref;
  };

  render() {
    const {
      product = {},
      productIsLoading,
      editProductIsLoading,
      editSkuIsLoading,
      createSkuIsLoading,
    } = this.props;
    const { showImageSku, skuImages, visibleModal } = this.state;

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
          <Row type="flex" align="middle">
            <Col span={21}>
              <Divider orientation="left">
                <span>SKUS</span>
              </Divider>
            </Col>
            <Col span={3}>
              <Button
                className="add-sku"
                type="dashed"
                onClick={this.showModal}
              >
                <Icon type="plus" />
                <span>Adicionar SKU</span>
              </Button>
            </Col>
          </Row>
          <CreateSkuModal
            ref={this.getFormCreateSku}
            onSubmit={this.handleSubmitCreateSku}
            showImage={showImageSku}
            handleChangeImage={this.handleChangeImageSku}
            skuImages={skuImages}
            loading={createSkuIsLoading}
            visibleModal={visibleModal}
            onCancel={this.handleCancel}
          />
          <SkuDataList
            ref={this.getFormEditSku}
            product={product}
            onSubmit={this.handleEditSubmit}
            editSkuIsLoading={editSkuIsLoading}
          />
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

  editSkuError: skusSelectors.makeSelectEditSkuError(),
  editSkuIsLoading: skusSelectors.makeSelectEditSkuIsLoading(),

  createSkuIsLoading: skusSelectors.makeSelectCreateSkuIsLoading(),
  createSkuError: skusSelectors.makeSelectCreateSkuError(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...productsActions, ...skusActions }, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditAvailableProductPage);
