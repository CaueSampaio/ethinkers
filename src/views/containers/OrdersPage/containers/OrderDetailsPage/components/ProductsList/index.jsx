/* eslint-disable */
import React, { Component } from 'react';
import { Row, Col, Card, List, Checkbox, Form } from 'antd';
import { compose } from 'redux';
import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import InvoiceProducts from './components/InvoiceProducts';
import CancelProducts from './components/CancelProducts';
import CheckBox from '../CheckBox';
import { formatCurrency } from '../../../../../../../utils/masks/formatCurrency';
import { isEmpty } from 'lodash';
import './style.less';
import { isEmptyBindingElement } from 'typescript';

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
      products,
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
      {isEmpty(item.channelSku.images) ? null : (
        <img
          alt="Image"
          src={item.channelSku.images[0].url}
          style={{ marginLeft: 8 }}
        />
      )}
    </div>
  );

  renderDescription = (item) => (
    <div className="product-description">
      <h3>
        Quantidade: <span>{item.quantity}</span>
      </h3>
      <h3>
        Preço: <span>{formatCurrency(item.netValue)}</span>
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
      if (product.id == event.target.value)
        product.isChecked = event.target.checked;
    });
    this.setState({ products: products });
  };

  getIdSelectedProducts = () => {
    const { products } = this.state;
    const selectedProducts = products.filter((product) => product.isChecked);
    let productsId = [];
    selectedProducts.forEach((item) => productsId.push(item.id));
    return productsId;
  };

  render() {
    const { products } = this.state;
    const {
      match: {
        params: { id },
      },
    } = this.props.props;
    return (
      <div>
        <PrivatePageSection>
          <h3>Produtos</h3>
          <Row type="flex">
            <InvoiceProducts products={products} id={id} />
            <CancelProducts products={products} id={id} />
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

const withForm = Form.create();

export default compose(withForm)(ProductList);
