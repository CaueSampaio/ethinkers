import React, { Component } from 'react';
import { Row, Col } from 'antd';

import PrivatePageHeader from '../../components/PrivatePageHeader';
import PrivatePageSection from '../../components/PrivatePageSection';
import StandardTable from '../../components/StandardTable';
import FilterForm from './components/FilterForm';

class OrdersPage extends Component {
  state = {};

  render() {
    const columns = [
      {
        title: 'Código',
        dataIndex: 'codigo',
        key: 'codigo',
      },
      {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
      },
      {
        title: 'Marca',
        dataIndex: 'marca',
        key: 'marca',
      },
    ];

    const data = [
      {
        codigo: 12344,
        nome: 'Tenis Nike Flex',
        marca: 'Nike',
      },
      {
        codigo: 1444,
        nome: 'Tenis Nike Flex',
        marca: 'Nike',
      },
      {
        codigo: 1944,
        nome: 'Tenis Nike Flex',
        marca: 'Nike',
      },
    ];

    return (
      <div>
        <PrivatePageHeader title="Pedidos" />
        <Row type="flex" gutter={16}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <PrivatePageSection>
              <StandardTable
                columns={columns}
                dataSource={data}
                minWidth={1000}
                rowKey={(record) => record.codigo}
              />
            </PrivatePageSection>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <PrivatePageSection>
              <FilterForm />
            </PrivatePageSection>
          </Col>
        </Row>
      </div>
    );
  }
}

export default OrdersPage;
