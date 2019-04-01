import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form, Icon, Upload, message, Modal, Button } from 'antd';

import {
  uploadInventories,
  downloadFile,
} from '../../../../../../../utils/request';

import './style.less';

class UpdateSpreadsheetButtons extends Component {
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

  onDownloadSpreadsheet = () => {
    downloadFile(`inventories/export`);
  };

  render() {
    const { uploadingFile } = this.state;
    const { textChildren, onCancel, visible } = this.props;

    const props = {
      ...uploadInventories(),
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
        } else if (file.status === 'error') {
          const { response: { Errors: errorMessage } = {} } = file;

          const text = errorMessage || 'Clique aqui ou arraste o arq';

          message.error(text);
        }
      },
    };

    return (
      <Modal
        title="Atualizar Planilha de Estoque"
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleUploadFile}
        confirmLoading={uploadingFile}
        footer={[]}
      >
        <p>
          Exporte a planilha, faça as devidas alterações e em seguida, faça o
          Upload da mesma.
        </p>
        <Button onClick={this.onDownloadSpreadsheet}>
          <Icon type="file-excel" />
          <span>Exportar planilha</span>
        </Button>
        <Upload {...props} style={{ marginLeft: 10 }}>
          <Button type="submit" loading={uploadingFile}>
            <Icon type="upload" />
            <span style={{ marginLeft: 5 }}>{textChildren}</span>
          </Button>
        </Upload>
      </Modal>
    );
  }
}

UpdateSpreadsheetButtons.propTypes = {
  form: PropTypes.object.isRequired,
  textChildren: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

const withForm = Form.create();

export default compose(withForm)(UpdateSpreadsheetButtons);
