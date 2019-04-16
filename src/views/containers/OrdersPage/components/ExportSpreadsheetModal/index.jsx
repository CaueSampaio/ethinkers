import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { Form, Icon, Modal, Button, Select, Row, Col, Spin } from 'antd';

import {
  channelsActions,
  channelsSelectors,
} from '../../../../../state/ducks/channels';

import { downloadFile, getQueryParams } from '../../../../../utils/request';

import StyledFormItem from '../../../../components/StyledFormItem';

class ExportSpreadsheetModal extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    channelsIsLoading: PropTypes.bool.isRequired,
    channels: PropTypes.array.isRequired,
    visible: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
  };

  state = {
    uploadingFile: false,
    channelSearch: null,
    disableExport: true,
    idChannel: null,
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

  onDownloadSpreadsheet = () => {
    const { idChannel } = this.state;
    const params = {
      idChannel,
    };
    downloadFile(`orders/export${getQueryParams(params)}`);
  };

  render() {
    const { uploadingFile, disableExport } = this.state;
    const {
      channels,
      channelsIsLoading,
      visible,
      onCancel,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Modal
        title="Planilha dos Pedidos"
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
              <Icon type="file" />
              <span>Exportar Planilha</span>
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

ExportSpreadsheetModal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  channels: channelsSelectors.makeSelectChannels(),
  channelsIsLoading: channelsSelectors.makeSelectChannelsIsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...channelsActions }, dispatch),
});

const withForm = Form.create();
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withForm,
  withConnect,
)(ExportSpreadsheetModal);
