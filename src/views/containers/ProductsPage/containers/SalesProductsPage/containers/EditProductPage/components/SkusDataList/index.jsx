import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import { Row, Col, Collapse, Divider, Input, Icon, Form, Button } from 'antd';

import EditSkuModal from '../EditSkuModal';
import StyledFormItem from '../../../../../../../../components/StyledFormItem';

const { Panel } = Collapse;

let id = 0;

class SkusDataList extends Component {
  state = { visibleModal: false };

  showModalEdit = (event) => {
    event.stopPropagation();

    this.setState({
      visibleModal: true,
    });
  };

  handleCancelEdit = () => {
    this.setState({
      visibleModal: false,
    });
  };

  renderGenExtra = () => (
    <button type="submit" onClick={this.showModalEdit}>
      <Icon type="edit" style={{ marginRight: 8, fontSize: 17 }} />
      Editar
    </button>
  );

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat((id += 1));
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  render() {
    const {
      product,
      product: { skus = [] },
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { visibleModal } = this.state;
    console.log(product);

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k) => (
      <Col span={8} key={k}>
        <Form.Item label="URL da Imagem" required={false}>
          {getFieldDecorator(`images[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
          })(<Input style={{ width: '90%' }} />)}

          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            style={{ marginLeft: 5 }}
            onClick={() => this.remove(k)}
          />
        </Form.Item>
      </Col>
    ));

    return (
      <Fragment>
        <Row>
          <Divider orientation="left">SKUS</Divider>
        </Row>
        {!isEmpty(skus) &&
          skus.map((sku) => (
            <Collapse key={sku.refSku}>
              <Panel
                header={`REF: ${sku.refSku}`}
                key="1"
                extra={this.renderGenExtra()}
              >
                <Form>
                  <Row type="flex" gutter={24}>
                    {!isEmpty(sku.images) &&
                      sku.images.map((image, i) => (
                        <Col span={12} key={sku.images[i]}>
                          <StyledFormItem label="URL da Imagem">
                            {getFieldDecorator('images02')(<Input />)}
                          </StyledFormItem>
                        </Col>
                      ))}
                  </Row>
                  <Row type="flex" gutter={10}>
                    {formItems}
                  </Row>
                  <Col span={6}>
                    <Button type="dashed" onClick={this.add}>
                      <Icon type="plus" />
                      <span>Add field</span>
                    </Button>
                  </Col>
                  <Row>
                    <Col />
                  </Row>
                </Form>
              </Panel>
            </Collapse>
          ))}
        <EditSkuModal
          product={product}
          visible={visibleModal}
          onCancel={this.handleCancelEdit}
        />
      </Fragment>
    );
  }
}

SkusDataList.propTypes = {
  product: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const withForm = Form.create();

export default compose(withForm)(SkusDataList);
