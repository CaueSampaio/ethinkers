import React, { Component } from 'react';
import PrivatePageHeader from '../../../../components/PrivatePageHeader';

class AvailableProductsPage extends Component {
  state = {};

  render() {
    return (
      <div>
        <PrivatePageHeader title="Produtos Disponíveis" />
        <span>Disponíveis</span>
      </div>
    );
  }
}

export default AvailableProductsPage;
