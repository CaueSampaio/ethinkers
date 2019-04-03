/* eslint-disable */
import React, { Component } from 'react';
import { compose } from 'redux';
import {
  Row,
  Form,
  Input,
  Card,
  List,
  Modal,
  Collapse,
  notification,
} from 'antd';
import { isEmpty } from 'lodash';
import PrivatePageHeaderButton from '../../../../../../components/PrivatePageHeaderButton';
import PrivatePageSection from '../../../../../../components/PrivatePageSection';
import CheckBox from '../CheckBox';

import './style.less';
import { consoleTestResultHandler } from 'tslint/lib/test';

const { Panel } = Collapse;

class InvoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceList: [],
      orderItems: [],
      invoiceModal: false,
    };
  }

  componentDidMount() {
    const { invoiceList, products } = this.props;
    this.setState({
      invoiceList,
      orderItems: products,
    });
  }

  renderTitle = (item) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        whiteSpace: 'normal',
      }}
    >
      {item.channelSku.description}
    </div>
  );

  renderAvatar = (item) => (
    <div style={{ display: 'flex' }}>
      <img
        alt="Image"
        src={item.channelSku.images[0].url}
        style={{ marginLeft: 8 }}
      />
    </div>
  );

  renderNetValue = (item) => (
    <div style={{ display: 'flex' }}>
      <span>{item.netValue}}</span>
    </div>
  );

  renderDescription = (item) => (
    <div className="product-description">
      <h3>
        Preço: <span>{item.netValue}</span>
      </h3>
      <h3>
        SKU: <span>{item.channelSku.refSku}</span>
      </h3>
      <h3>
        Status: <span>{item.status}</span>
      </h3>
    </div>
  );

  renderExtra = (item) => (
    <PrivatePageHeaderButton
      onClick={(e) => this.showTrackInvoiceModal(e, item)}
    >
      Adicionar tracking
    </PrivatePageHeaderButton>
  );

  renderTrackingForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div>
        <Form>
          <Form.Item label="Código de rastreio">
            {getFieldDecorator('code', {
              rules: [
                {
                  required: true,
                  message: 'O código de rastreio é um campo obrigatório.',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Url">
            {getFieldDecorator('url', {
              rules: [
                { required: true, message: 'A url é um campo obrigatório.' },
              ],
            })(<Input />)}
          </Form.Item>
        </Form>
      </div>
    );
  };

  handleOk = (invoice) => {
    const { id } = invoice;
    const {
      trackSkus,
      form: { validateFields, resetFields },
    } = this.props;
    validateFields(async (err, value) => {
      if (err) return;
      const data = {
        tracking: {
          ...value
        }
      }
      const result = await trackSkus(id, data);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'Tracking SKUS enviadas com sucesso',
        });
        this.handleCancel();
        resetFields();
      }
    });
    this.setState({
      invoiceModal: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      invoiceModal: false,
    });
  };

  showTrackInvoiceModal = (e, item) => {
    this.setState({
      invoiceModal: true,
    });
  };

  filterInvoiceProducts = (idOrderItems) => {
    const orderItems = [...this.state.orderItems];
    let auxList = [];
    orderItems.forEach((orderItem) => {
      if (idOrderItems.some((item) => item == orderItem.Id)) {
        auxList.push(orderItem);
      }
    });
    return auxList;
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render() {
    const { invoiceList } = this.state;

    return (
      <div>
        <PrivatePageSection>
          <h3>Invoices</h3>
          <List
            rowKey="id"
            grid={{ gutter: 24, lg: 1, md: 1, sm: 1, xs: 1 }}
            dataSource={[...invoiceList]}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Collapse>
                  <Panel
                    header={`${item.number}-${item.series}`}
                    key="1"
                    extra={this.renderExtra(item)}
                  >
                    <Modal
                      title={`Adicionar tracking ao pedido ${item.number}-${
                        item.series
                      }`}
                      visible={this.state.invoiceModal}
                      onOk={() => this.handleOk(item)}
                      onCancel={this.handleCancel}
                      centered={true}
                      okText="Enviar tracking"
                    >
                      {this.renderTrackingForm(item)}
                    </Modal>
                    <List
                      rowKey="id"
                      grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                      dataSource={this.filterInvoiceProducts(item.idOrderItems)}
                      renderItem={(item) => (
                        <List.Item key={item.id}>
                          <Card hoverable className="card">
                            <Card.Meta
                              avatar={this.renderAvatar(item)}
                              title={this.renderTitle(item)}
                              description={this.renderDescription(item)}
                            />
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Panel>
                </Collapse>
              </List.Item>
            )}
          />
        </PrivatePageSection>
      </div>
    );
  }
}

const withForm = Form.create({ name: 'tracking_form' });

export default compose(withForm)(InvoiceList);
