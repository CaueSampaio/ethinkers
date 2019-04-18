import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form, Icon, Upload, message, Modal, Button } from 'antd';

import {
  downloadFile,
  defaultUploadProps,
} from '../../../../../../../utils/request';

import DocumentErrorItemsCard from '../../../../../../components/DocumentErrorItemsCard';

class UpdateSpreadsheetProductButtons extends Component {
  state = {
    uploadingFile: false,
    errors: [],
    documentHasError: false,
    fileList: [], // eslint-disable-line
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
    downloadFile(`products/export`);
  };

  render() {
    const { uploadingFile, documentHasError, errors } = this.state;
    const { textChildren, onCancel, visible } = this.props;

    const props = {
      ...defaultUploadProps(),
      onChange: async (info) => {
        let { fileList } = info;
        fileList = fileList.slice(-1);

        const { file } = info;

        this.setState({
          document: file, // eslint-disable-line
        });

        await this.handleUploadingStatus(file.status);

        if (file.status === 'done') {
          const { name } = file;

          message.success('Sucesso', { fileName: name });
        } else if (file.status === 'error') {
          const { response: { Errors: errorMessage } = {} } = file;

          const text = errorMessage || 'Erro durante o upload';

          message.error(text);
        }

        this.setState({ fileList }); // eslint-disable-line
      },
    };

    return (
      <Modal
        title="Atualizar Planilha de Produtos"
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleUploadFile}
        confirmLoading={uploadingFile}
        width={documentHasError ? 700 : 500}
        footer={[]}
      >
        <p>
          Exporte a planilha, faça as devidas alterações e em seguida faça o
          Upload da mesma
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
        {documentHasError && <DocumentErrorItemsCard errors={errors} />}
      </Modal>
    );
  }
}

UpdateSpreadsheetProductButtons.propTypes = {
  form: PropTypes.object.isRequired,
  textChildren: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

const withForm = Form.create();

export default compose(withForm)(UpdateSpreadsheetProductButtons);
