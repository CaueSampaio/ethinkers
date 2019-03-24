import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form, Button, Icon, Upload, message } from 'antd';

import { defaultUploadProps } from '../../../utils/request';

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

    const props = {
      ...defaultUploadProps(),
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
      <Upload {...props}>
        <Button disabled={uploadingFile}>
          <Icon type="upload" />
          <span>Atualizar Produtos via Planilha</span>
        </Button>
      </Upload>
    );
  }
}

UploadButton.propTypes = {
  form: PropTypes.object.isRequired,
};

const withForm = Form.create();

export default compose(withForm)(UploadButton);
