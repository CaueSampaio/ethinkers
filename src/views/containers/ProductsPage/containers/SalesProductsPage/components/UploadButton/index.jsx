import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import {
  Form,
  Icon,
  Upload,
  message,
  Modal,
  Button,
  Select,
  Row,
  Col,
  Spin,
  notification,
} from 'antd';

import {
  channelsActions,
  channelsSelectors,
} from '../../../../../../../state/ducks/channels';
import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../../../state/ducks/channelProducts';

import { uploadChannelProduct } from '../../../../../../../utils/request';

import StyledFormItem from '../../../../../../components/StyledFormItem';
import DocumentErrorItemsCard from '../../../../../../components/DocumentErrorItemsCard';
import BadRequestNotificationBody from '../../../../../../components/BadRequestNotificationBody';

class UploadButton extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    channelsIsLoading: PropTypes.bool.isRequired,
    channels: PropTypes.array.isRequired,
  };

  state = {
    uploadingFile: false,
    channelSearch: null,
    disableExport: true,
    idChannel: null,
    errors: [],
    documentHasError: false,
  };

  componentDidMount() {
    this.fetchChannels();
  }

  handleChannelSelectSearch = async (value) => {
    await this.setState({
      channelSearch: isEmpty(value) ? null : value,
    });
    this.fetchChannels();
  };

  handleChannelSelect = (value) => {
    this.setState({
      idChannel: value,
      disableExport: false,
    });
  };

  fetchChannels = async () => {
    const {
      actions: { listChannels, clearChannels },
    } = this.props;
    const { channelSearch } = this.state;
    await clearChannels();
    await listChannels(
      isEmpty(channelSearch) ? null : { search: channelSearch },
    );
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
    const {
      actions: { exportChannelProducts },
      onCancel,
    } = this.props;
    const { idChannel } = this.state;
    const params = {
      idChannel,
    };
    const result = await exportChannelProducts(params);
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
    const {
      uploadingFile,
      disableExport,
      errors,
      documentHasError,
    } = this.state;
    const {
      channels,
      channelsIsLoading,
      exportIsLoading,
      textChildren,
      visible,
      onCancel,
      form: { getFieldDecorator },
    } = this.props;

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
          // const { response: { Errors: errorMessage } = {} } = file;

          const text = 'Houve erro durante o upload do arquivo.';

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
        width={600}
        footer={[]}
      >
        <Row type="flex" gutter={16} align="middle">
          <Col span={16}>
            <StyledFormItem label="Para exportar a planilha, selecione um Canal:">
              {getFieldDecorator('idsChannels', { initialValue: [] })(
                <Select
                  showSearch
                  filterOption={false}
                  notFoundContent={
                    channelsIsLoading ? <Spin size="small" /> : null
                  }
                  onSearch={this.handleChannelSelectSearch}
                  onSelect={this.handleChannelSelect}
                  style={{ width: '100%' }}
                >
                  {channels.map((channel) => (
                    <Select.Option key={channel.id} title={channel.name}>
                      {channel.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </StyledFormItem>
          </Col>
          <Col span={8}>
            <Button
              onClick={this.onDownloadSpreadsheet}
              disabled={disableExport}
              type="dashed"
              style={{
                marginTop: 12,
                borderRadius: 10,
              }}
            >
              {exportIsLoading ? <Icon type="loading" /> : <Icon type="file" />}
              <span>Exportar Planilha</span>
            </Button>
          </Col>
        </Row>
        <p>Com as informações da Planilha atualizadas, faça o Upload:</p>
        <Upload {...props}>
          <Button
            style={{
              borderRadius: 10,
              borderColor: '#1464b4',
              color: '#1464b4',
              width: 120,
            }}
            type="dashed"
            disabled={uploadingFile}
          >
            <Icon type="upload" />
            <span style={{ marginLeft: 5 }}>{textChildren}</span>
          </Button>
        </Upload>
        {documentHasError && <DocumentErrorItemsCard errors={errors} />}
      </Modal>
    );
  }
}

UploadButton.propTypes = {
  form: PropTypes.object.isRequired,
  textChildren: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  exportError: PropTypes.object,
  exportIsLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  channels: channelsSelectors.makeSelectChannels(),
  channelsIsLoading: channelsSelectors.makeSelectChannelsIsLoading(),

  exportError: channelProductsSelectors.makeSelectExportProductsError(),
  exportIsLoading: channelProductsSelectors.makeSelectExportProductsIsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { ...channelsActions, ...channelProductsActions },
    dispatch,
  ),
});

const withForm = Form.create();
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withForm,
  withConnect,
)(UploadButton);
