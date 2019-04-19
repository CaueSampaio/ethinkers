import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form, Icon, Upload, message, Modal, Button, notification } from 'antd';

import { defaultUploadProps } from '../../../../../../../utils/request';

import DocumentErrorItemsCard from '../../../../../../components/DocumentErrorItemsCard';
import BadRequestNotificationBody from '../../../../../../components/BadRequestNotificationBody';

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

  onDownloadSpreadsheet = async () => {
    const { exportProducts, onCancel } = this.props;
    const result = await exportProducts();
    if (!result.error) {
      const {
        payload: { message: description },
      } = result;
      onCancel();
      notification.success({
        message: 'Sucesso',
        description,
      });
    } else {
      const {
        exportError: { message: messageError, errors },
      } = this.props;
      notification.error({
        message: messageError,
        description: <BadRequestNotificationBody errors={errors} />,
      });
    }
  };

  render() {
    const { uploadingFile, documentHasError, errors } = this.state;
    const { textChildren, onCancel, visible, isLoading } = this.props;

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
          {isLoading ? <Icon type="loading" /> : <Icon type="file-excel" />}
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
  exportProducts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  exportError: PropTypes.object,
};

const withForm = Form.create();

export default compose(withForm)(UpdateSpreadsheetProductButtons);
