/* eslint-disable */
import React, { Component } from 'react';
import { Row, Col, Card, List, Checkbox, Modal, notification } from 'antd';
import { isEmpty } from 'lodash';

import PrivatePageHeaderButton from '../../../../../../components/PrivatePageHeaderButton';
import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import CheckBox from '../CheckBox';

import './style.less';
import { consoleTestResultHandler } from 'tslint/lib/test';

const { confirm } = Modal;

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const { products } = this.props;
    this.setState({
      products: products,
    });
  }

  renderTitle = (item) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        whiteSpace: 'normal',
      }}
    >
      {item.channelSku.description}
    </div>
  );

  renderAvatar = (item) => (
    <div style={{ display: 'flex' }}>
      <CheckBox
        handleCheckChieldElement={this.handleCheckChieldElement}
        {...item}
      />
      <img alt="" src={item.channelSku.images[0]} style={{ marginLeft: 8 }} />
    </div>
  );

  renderNetValue = (item) => (
    <div style={{ display: 'flex' }}>
      <span>{item.netValue}}</span>
    </div>
  );

  renderDescription = (item) => (
    <div className="product-description">
      <h3>
        Quantidade: <span>{item.quantity}</span>
      </h3>
      <h3>
        Preço: <span>{item.netValue}</span>
      </h3>
      <h3>
        SKU: <span>{item.channelSku.refSku}</span>
      </h3>
      <h3>
        Status: <span>{item.status}</span>
      </h3>
    </div>
  );

  handleAllChecked = (event) => {
    let { products } = this.state;
    products.forEach((product) => (product.isChecked = event.target.checked));
    this.setState({ products: products });
  };

  handleCheckChieldElement = (event) => {
    let { products } = this.state;
    products.forEach((product) => {
      if (product.channelSku.refSku == event.target.value)
        product.isChecked = event.target.checked;
    });
    this.setState({ products: products });
    console.log("target", event);
  };

  showConfirmInvoiceProductsSKU = (event, products) => {
    console.log(this.props)
    const {
      actions: { invoiceOrderProductsSKU },
      editStatusError,
    } = this.props.props;
    const data = this.getSelectedProducts(products);
    console.log("DATA", data);

    confirm({
      title: 'Deseja realmente faturar os produtos selecionados?',
      okText: 'Confirmar',
      content: 'Ao faturar, sera gerado um invoice dos produtos selecionados',
      onOk: async () => {
        const result = await invoiceOrderProductsSKU(data);
        if (!result.error) {
          await notification.success({
            message: 'Sucesso',
            description: 'Produtos faturados com sucesso',
          });
        } else {
          const { message: errorMessage, errors } = editStatusError;
          notification.error({
            message: errorMessage,
            description: <BadRequestNotificationBody errors={errors} />,
          });
        }
      },
    });
  };

  getSelectedProducts = (productsList) => (
    productsList.filter(product => product.isChecked)
  );

  render() {
    const { products } = this.state;

    return (
      <div>
        <PrivatePageSection>
          <h3>Produtos</h3>
          <Row type="flex">
            <PrivatePageHeaderButton onClick={(e) => this.showConfirmInvoiceProductsSKU(e, products)}>Faturar SKUS</PrivatePageHeaderButton>
            <PrivatePageHeaderButton onClick={(e) => this.sendProductsSKU(e, products)}>
              Enviar tracking dos SKUS
            </PrivatePageHeaderButton>
            <PrivatePageHeaderButton onClick={(e) => this.cancelProducts(e, product)}>Cancelar produto</PrivatePageHeaderButton>
          </Row>
          <Row>
            <Col className="space-bottom">
              <Checkbox onClick={this.handleAllChecked} value="checkedall">
                Selecionar todos
              </Checkbox>
            </Col>
          </Row>
          <List
            rowKey="id"
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={[...products]}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Card hoverable className="card">
                  <Card.Meta
                    avatar={this.renderAvatar(item)}
                    title={this.renderTitle(item)}
                    description={this.renderDescription(item)}
                  />
                </Card>
              </List.Item>
            )}
          />
        </PrivatePageSection>
      </div>
    );
  }
}

export default ProductList;
