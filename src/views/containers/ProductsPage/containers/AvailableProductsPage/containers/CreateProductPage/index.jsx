import React, { Component, Fragment } from 'react';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import PrivatePageHeader from '../../../../../../components/PrivatePageHeader';
import AvailableProductForm from '../../components/AvailableProductForm';

class CreateProductPage extends Component {
  state = {};

  getFormRef = (ref) => {
    this.formRef = ref;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { validateFields } = this.formRef;

    validateFields(async (err, values) => {
      if (err) return;
      console.log(values);
    });
  };

  render() {
    return (
      <Fragment>
        <PrivatePageHeader title="Cadastrar Produto" />
        <PrivatePageSection>
          <AvailableProductForm
            ref={this.getFormRef}
            onSubmit={this.onSubmit}
          />
        </PrivatePageSection>
      </Fragment>
    );
  }
}

export default CreateProductPage;
