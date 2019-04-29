import React, { Component } from 'react';
import { compose } from 'redux';
import { Form, Input, Card, List, Modal, Collapse, notification } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import actions from '../../../../../../../../state/ducks/orders/actions';
import PrivatePageHeaderButton from '../../../../../../../components/PrivatePageHeaderButton';
import { formatCurrency } from '../../../../../../../../utils/masks/formatCurrency';
import { ordersConstants } from '../../../../../../../../state/ducks/orders';

const { orderStatusEnum } = ordersConstants;

const { Panel } = Collapse;

class InvoiceItem extends Component {
  state = {
    visible: false,
  };

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
        alt="Imagem"
        src={item.channelSku.images[0].url}
        style={{ marginLeft: 8 }}
        className="product-image"
      />
    </div>
  );

  renderNetValue = (item) => (
    <div style={{ display: 'flex' }}>
      <span>{item.netValue}</span>
    </div>
  );

  renderDescription = (item) => (
    <div className="product-description">
      <h3>
        Quantidade: <span>{item.quantity}</span>
      </h3>
      <h3>
        Preço: <span>{formatCurrency(item.netValue)}</span>
      </h3>
      <h3>
        SKU: <span>{item.channelSku.refSku}</span>
      </h3>
      <h3>
        Status:{' '}
        <span>
          {orderStatusEnum.map(
            (statusEnum) =>
              statusEnum.value === item.status && statusEnum.status,
          )}
        </span>
      </h3>
      <h3>
        Envio: <span>{item.channelShipping.name}</span>
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
      form: { validateFields, resetFields },
    } = this.props;
    const { trackSkus } = actions;
    validateFields(async (err, value) => {
      if (err) return;
      const data = {
        ...value,
      };
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
      visible: false,
    });
  };

  handleCancel = () => {
    const {
      form: { resetFields },
    } = this.props;
    resetFields();
    this.setState({
      visible: false,
    });
  };

  showTrackInvoiceModal = (e) => {
    e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  filterInvoiceProducts = (idOrderItems) => {
    const { orderItems } = this.props;
    const orderItemList = [...orderItems];
    const auxList = [];
    orderItemList.forEach((orderItem) => {
      if (idOrderItems.some((item) => item === orderItem.id)) {
        auxList.push(orderItem);
      }
    });
    return auxList;
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render() {
    const { visible } = this.state;
    const { invoice } = this.props;
    return (
      <>
        <Collapse className="content-collapse-sku">
          <Panel
            header={`Invoice ${invoice.number}-${
              invoice.series
            }, Data de emissão: ${moment().format(
              'DD/MM/YYYY',
              invoice.issuanceDate,
            )}`}
            key={invoice.id}
            extra={this.renderExtra(invoice)}
          >
            <List
              rowKey="id"
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={this.filterInvoiceProducts(invoice.idOrderItems)}
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
        <Modal
          title={`Adicionar tracking ao pedido ${invoice.number}-${
            invoice.series
          }`}
          visible={visible}
          onOk={() => this.handleOk(invoice)}
          onCancel={this.handleCancel}
          centered
          okText="Enviar tracking"
        >
          {this.renderTrackingForm(invoice)}
        </Modal>
      </>
    );
  }
}

InvoiceItem.defaultProps = {
  form: {},
};

InvoiceItem.propTypes = {
  orderItems: PropTypes.array.isRequired,
  invoice: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}),
};

const withForm = Form.create({ name: 'tracking_form' });

export default compose(withForm)(InvoiceItem);
