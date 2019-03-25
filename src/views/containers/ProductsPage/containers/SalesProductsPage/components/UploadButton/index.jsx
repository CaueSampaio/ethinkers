import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form, Icon, Upload, message } from 'antd';

import { uploadChannelProduct } from '../../../../../../../utils/request';

import './style.less';

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
    const { textChildren } = this.props;

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
        } else if (file.status === 'error') {
          const { response: { Errors: errorMessage } = {} } = file;

          const text = errorMessage || 'Clique aqui ou arraste o arq';

          message.error(text);
        }
      },
    };

    return (
      <Upload {...props}>
        <button
          type="submit"
          className="private-page-header-button"
          disabled={uploadingFile}
        >
          <Icon type="upload" />
          <span style={{ marginLeft: 5 }}>{textChildren}</span>
        </button>
      </Upload>
    );
  }
}

UploadButton.propTypes = {
  form: PropTypes.object.isRequired,
  textChildren: PropTypes.string.isRequired,
};

const withForm = Form.create();

export default compose(withForm)(UploadButton);
