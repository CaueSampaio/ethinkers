import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Modal, Button, Form, Select } from 'antd';

import StyledFormItem from '../../../../../../components/StyledFormItem';

const { Option } = Select;

const ChannelsFormModal = ({
  visible,
  handleCancel,
  onSubmit,
  isLoading,
  channels,
  form: { getFieldDecorator },
}) => (
  <Modal
    title="Enviar produto(s) para o Canal"
    visible={visible}
    onCancel={handleCancel}
    footer={[
      <Button key="back" onClick={handleCancel}>
        Cancelar
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={isLoading}
        onClick={onSubmit}
      >
        Confirmar
      </Button>,
    ]}
  >
    <Form>
      <StyledFormItem label="Selecione o Canal">
        {getFieldDecorator('idChannel', {
          rules: [
            {
              required: true,
              message: 'Favor, preencher o campo Canal!',
            },
          ],
        })(
          <Select style={{ width: '100%' }}>
            {channels.map((channel) => (
              <Option key={channel.id} title={channel.name}>
                {channel.name}
              </Option>
            ))}
          </Select>,
        )}
      </StyledFormItem>
    </Form>
  </Modal>
);

ChannelsFormModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  channels: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
};

const withForm = Form.create();

export default compose(withForm)(ChannelsFormModal);
