/* eslint-disable */
import React, { Component } from 'react';
import { Row, Card, List } from 'antd';
import { isEmpty } from 'lodash';

import PrivatePageSection from '../../../../../../components/PrivatePageSection';

import './style.less';

class ProductList extends Component {
  state = {};

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
          <List
            rowKey="id"
            // loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={[...list]}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Card hoverable className="card">
                  <Card.Meta
                    avatar={<img alt="" src={item.avatar} />}
                    title={item.title}
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
