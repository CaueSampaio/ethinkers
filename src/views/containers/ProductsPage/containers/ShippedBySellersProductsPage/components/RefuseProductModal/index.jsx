import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Modal, Form, Input, Row, Col, Button } from 'antd';

const RefuseProductModal = ({
  visible,
  onCancel,
  editStatusIsLoading,
  onSubmit,
  form: { getFieldDecorator },
}) => (
  <Modal
    title="Recusar Produto"
    visible={visible}
    onCancel={onCancel}
    footer={[
      <Button key="back" onClick={onCancel}>
        <span>Cancelar</span>
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={editStatusIsLoading}
        onClick={onSubmit}
      >
        <span>Confirmar</span>
      </Button>,
    ]}
  >
    <Form>
      <Row>
        <Col>
          <Form.Item label="Motivo de Recusa">
            {getFieldDecorator('reason', {
              rules: [
                {
                  required: true,
                  message: 'Favor, inserir o Motivo de recusa!',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Modal>
);

RefuseProductModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  editStatusIsLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

const withForm = Form.create();

export default compose(withForm)(RefuseProductModal);
