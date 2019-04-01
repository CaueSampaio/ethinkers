import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form, Icon, Upload, message, Modal, Button } from 'antd';

import { uploadChannelProduct } from '../../../../../../../utils/request';

class UploadButton extends Component {
  state = {
    uploadingFile: false,
  };

  handleUploadingStatus = async (status) => {
    switch (status) {
      case 'uploading':
        await this.setState({ uploadingFile: true });
        break;
      case 'done':
      case 'error':
        await this.setState({ uploadingFile: false });
        break;
      default:
        break;
    }
  };

  render() {
    const { uploadingFile } = this.state;
    const { textChildren, visible, onCancel } = this.props;

    const props = {
      ...uploadChannelProduct(),
      accept: '.xls, .xlsx',
      multiple: false,
      onChange: async (info) => {
        const { file } = info;

        this.setState({
          document: file, // eslint-disable-line
        });

        await this.handleUploadingStatus(file.status);
        if (file.status === 'done') {
          message.success(
            `Upload do arquivo ${file.name} realizado com sucesso!`,
          );
          onCancel();
        } else if (file.status === 'error') {
          const { response: { Errors: errorMessage } = {} } = file;

          const text = errorMessage || 'Clique aqui ou arraste o arquivo.';

          message.error(text);
        }
      },
    };

    return (
      <Modal
        title="Planilha com produtos curados"
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleUploadFile}
        confirmLoading={uploadingFile}
        footer={[
          <Button style={{ borderRadius: 50 }} key="back" onClick={onCancel}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ borderRadius: 50 }}
            loading={uploadingFile}
            onClick={this.handleUploadFile}
          >
            Atualizar
          </Button>,
        ]}
      >
        <p>Faça o Upload da planilha atualizada</p>
        <Upload {...props}>
          <Button style={{ width: 120 }} type="submit" disabled={uploadingFile}>
            <Icon type="upload" />
            <span style={{ marginLeft: 5 }}>{textChildren}</span>
          </Button>
        </Upload>
      </Modal>
    );
  }
}

UploadButton.propTypes = {
  form: PropTypes.object.isRequired,
  textChildren: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const withForm = Form.create();

export default compose(withForm)(UploadButton);
