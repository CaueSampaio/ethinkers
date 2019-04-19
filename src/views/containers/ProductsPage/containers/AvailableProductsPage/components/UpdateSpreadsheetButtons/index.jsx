import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form, Icon, Upload, message, Modal, Button, notification } from 'antd';

import { uploadInventories } from '../../../../../../../utils/request';
import BadRequestNotificationBody from '../../../../../../components/BadRequestNotificationBody';

import DocumentErrorItemsCard from '../../../../../../components/DocumentErrorItemsCard';

import './style.less';

class UpdateSpreadsheetButtons extends Component {
  state = {
    uploadingFile: false,
    errors: [],
    documentHasError: false,
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
    const { exportInventories, onCancel } = this.props;
    const result = await exportInventories();
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
          const { response, response: { Errors: errorMessage } = {} } = file;
          this.setState({
            errors: response,
            documentHasError: true,
          });
          const text =
            errorMessage || 'Houve erro durante o upload do arquivo.';

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
        width={documentHasError ? 700 : 500}
        footer={[]}
      >
        <p>
          Exporte a planilha, faça as devidas alterações e em seguida, faça o
          Upload da mesma.
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

UpdateSpreadsheetButtons.propTypes = {
  form: PropTypes.object.isRequired,
  textChildren: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  exportInventories: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  exportError: PropTypes.object,
};

const withForm = Form.create();

export default compose(withForm)(UpdateSpreadsheetButtons);
