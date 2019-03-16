import React, { Component } from 'react';
import PrivatePageHeader from '../../../../components/PrivatePageHeader';

class ShippedBySellersProductsPage extends Component {
  state = {};

  render() {
    return (
      <div>
        <PrivatePageHeader title="Produtos Enviados por Sellers" />
        <div>Envidos por Sellers</div>
      </div>
    );
  }
}

export default ShippedBySellersProductsPage;
