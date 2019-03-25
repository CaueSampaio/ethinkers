import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import {
  Form,
  Divider,
  Collapse,
  Avatar,
  Row,
  Col,
  Input,
  Button,
  Icon,
} from 'antd';

const { Panel } = Collapse;

let id = 0;
let idImage = 0;

class SkusFieldsForm extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
  };

  state = {};

  callback = (key) => {
    console.log(key);
  };

  addImage = () => {
    console.log('aq');
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keysImage');
    const nextKeys = keys.concat((idImage += 1));

    form.setFieldsValue({
      keysImage: nextKeys,
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat((id += 1));

    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  render() {
    const {
      product: { skus = [] },
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    console.log(skus);
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    getFieldDecorator('keysImage', { initialValue: [] });
    const keysImage = getFieldValue('keysImage');

    const formItemsImage = keysImage.map((k) => (
      <Row gutter={10}>
        <Col span={8}>
          <Form.Item label="URL da imagem" required={false} key={k}>
            {getFieldDecorator(`images[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message:
                    "Please input passenger's name or delete this field.",
                },
              ],
            })(<Input placeholder="passenger name" />)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Nome">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Descrição">
            <Input />
          </Form.Item>
        </Col>
        <Col>
          {keysImage.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keysImage.length === 1}
              // onClick={() => this.remove(k)}
            />
          ) : null}
        </Col>
      </Row>
    ));

    const formItems = keys.map((k) => (
      <Row type="flex" align="middle" gutter={10} style={{ marginTop: 10 }}>
        <Col span={24}>
          <Collapse key={k} onChange={this.callback}>
            <Panel
              header="sku"
              key={k}
              extra={
                // eslint-disable-next-line
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  // disabled={keys.length === 1}
                  onClick={() => this.remove(k)}
                />
              }
            >
              <div>
                <Row type="flex" gutter={10} align="middle">
                  <Col span={6}>
                    <Form.Item label="Imagem">
                      <Avatar size="large" src="" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="URL da imagem">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Nome">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Descrição">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
              <Row type="flex" justify="end">
                <Button>Adicionar imagem</Button>
              </Row>
              <Row type="flex" gutter={10}>
                <Col span={8}>
                  <Form.Item label="EAN">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Preço de">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Preço por:">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Descrição">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Peso">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Comprimento">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Largura">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Altura">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Peso real:">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Comprimento real:">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Largura real:">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Altura real:">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    ));

    return (
      <Fragment>
        <Divider orientation="left">SKUS</Divider>
        {skus.map((sku) => (
          <Collapse key={sku.refSku} onChange={this.callback}>
            <Panel header={sku.refSku} key={sku.refSku}>
              {!isEmpty(sku.images)
                ? sku.images.map((
                    image, // eslint-disable-next-line
                  ) => (
                    <div>
                      <Row type="flex" gutter={10} align="middle">
                        <Col span={6}>
                          <Form.Item label="Imagem">
                            <Avatar size="large" src={image} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item label="URL da imagem">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item label="Nome">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item label="Descrição">
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  ))
                : ''}
              <Row>{formItemsImage}</Row>
              <Row type="flex" justify="end">
                <Button onClick={this.addImage}>
                  <Icon type="plus" />
                  <span>Adicionar imagem</span>
                </Button>
              </Row>
              <Row type="flex" gutter={10}>
                {!isEmpty(sku.attributes) &&
                  sku.attributes.map((attribute) => (
                    <Col span={8}>
                      <Form.Item label="Atributo" key={attribute.id}>
                        <Input />
                      </Form.Item>
                    </Col>
                  ))}
                <Col span={8}>
                  <Form.Item label="EAN">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Preço de">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Preço por:">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Descrição">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Peso">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Comprimento">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Largura">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Altura">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Peso real:">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Comprimento real:">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Largura real:">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Altura real:">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        ))}

        {formItems}
        <Button style={{ marginTop: 20 }} onClick={this.add}>
          {' '}
          <Icon type="plus" />
          <span>Adicionar SKU</span>
        </Button>
      </Fragment>
    );
  }
}

const withForm = Form.create();

export default compose(withForm)(SkusFieldsForm);
