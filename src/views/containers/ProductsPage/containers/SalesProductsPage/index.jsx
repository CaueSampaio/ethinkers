import React, { Component } from 'react';
import PrivatePageHeader from '../../../../components/PrivatePageHeader';

class SalesProductsPage extends Component {
  state = {};

  render() {
    return (
      <div>
        <PrivatePageHeader title="Produtos a Venda" />
        <span>produtos a venda</span>
      </div>
    );
  }
}

export default SalesProductsPage;
