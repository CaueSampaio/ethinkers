import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';
import { Modal, Form } from 'antd';

class EditSkuModal extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,

    product: PropTypes.object.isRequired,
  };

  state = {};

  render() {
    const { onCancel, visible, product } = this.props;
    console.log(product);
    return (
      <Modal
        title="Editar SKU"
        visible={visible}
        onOk={this.onSubmit}
        width={800}
        onCancel={onCancel}
      >
        <Form />
      </Modal>
    );
  }
}

const withForm = Form.create();

export default compose(withForm)(EditSkuModal);
