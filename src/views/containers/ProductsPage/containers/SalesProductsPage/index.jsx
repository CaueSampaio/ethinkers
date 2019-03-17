/*eslint-disable*/
import React, { Component, Fragment } from 'react';
import { Row, Col, Dropdown, Icon, Menu } from 'antd';

import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PrivatePageSection from '../../../../components/PrivatePageSection';
import SummaryProducts from './components/SummaryProducts';
import SynchronizeProducts from './components/SynchronizeProducts';
import StandardTable from '../../../../components/StandardTable';
import FilterForm from './components/FilterForm';

class SalesProductsPage extends Component {
  state = {};

  render() {
    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/">
            3d menu item
          </a>
        </Menu.Item>
      </Menu>
    );
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
      {
        dataIndex: 'actions',
        key: 'actions',
        render: () => (
          <Dropdown overlay={itemMenu}>
            <Icon type="ellipsis" />
          </Dropdown>
        ),
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

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows,
        );
      },
    };

    return (
      <Fragment>
        <PrivatePageHeader title="Produtos a Venda" />
        <Row type="flex" gutter={24}>
          <Col xs={24} sm={24} md={24} lg={24} xl={16}>
            <SummaryProducts />
            <SynchronizeProducts />
            <PrivatePageSection>
              <StandardTable
                minWidth={1000}
                rowSelection={rowSelection}
                dataSource={data}
                columns={columns}
                rowKey={(record) => record.codigo}
              />
            </PrivatePageSection>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8}>
            <PrivatePageSection>
              <FilterForm />
            </PrivatePageSection>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default SalesProductsPage;
