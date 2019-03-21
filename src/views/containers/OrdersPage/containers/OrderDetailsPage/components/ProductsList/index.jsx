/* eslint-disable */
import React, { Component } from 'react';
import { Row, Col, Card, List, Checkbox } from 'antd';
import { isEmpty } from 'lodash';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';

import './style.less';

class ProductList extends Component {
  state = {};

  renderTitle = (item) => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{item.title}</span>
      <span>Vestuário</span>
    </div>
  );

  renderAvatar = (item) => (
    <div style={{ display: 'flex' }}>
      <Checkbox />
      <img alt="" src={item.avatar} style={{ marginLeft: 8 }} />
    </div>
  );
  render() {
    const list = [
      {
        id: 1235,
        description: 'fdhjgdhk',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        title: 'Tênis nike',
      },
      {
        id: 78787,
        description: 'fdhjgdhk',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        title: 'Tênis asics',
      },
      {
        id: 4564,
        description: 'fdhjgdhk',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        title: 'Tênis flex',
      },
    ];
    return (
      <div>
        <PrivatePageSection>
          <h3>Produtos</h3>
          <Row>actions</Row>
          <Row>
            <Col className="space-bottom">
              <Checkbox>Selecionar todos</Checkbox>
            </Col>
          </Row>
          <List
            rowKey="id"
            // loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={[...list]}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Card hoverable className="card">
                  <Card.Meta
                    avatar={this.renderAvatar(item)}
                    title={this.renderTitle(item)}
                    description={item.description}
                  />
                </Card>
              </List.Item>
            )}
          />
        </PrivatePageSection>
      </div>
    );
  }
}

export default ProductList;
