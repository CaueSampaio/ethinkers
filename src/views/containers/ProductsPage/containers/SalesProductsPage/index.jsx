/*eslint-disable*/
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Dropdown, Icon, Menu, Avatar } from 'antd';

import {
  channelProductsActions,
  channelProductsSelectors,
} from '../../../../../state/ducks/channelProducts';

import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PrivatePageSection from '../../../../components/PrivatePageSection';
import SummaryProducts from './components/SummaryProducts';
import SynchronizeProducts from './components/SynchronizeProducts';
import StandardTable from '../../../../components/StandardTable';
import FilterForm from './components/FilterForm';

class SalesProductsPage extends Component {
  state = {
    selectedProducts: [],
  };

  componentDidMount() {
    const {
      actions: { listChannelProducts },
    } = this.props;
    const result = listChannelProducts();
    console.log(result);
  }

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
        title: 'Imagem',
        dataIndex: 'imagem',
        key: 'image',
      },
      {
        title: 'Código',
        dataIndex: 'idProduct',
        key: 'id',
      },
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Marca',
        dataIndex: 'brand.name',
        key: 'brand',
      },
      {
        title: 'Categoria',
        dataIndex: 'category.name',
        key: 'category',
      },
      {
        title: 'Canal',
        dataIndex: 'channel.name',
        key: 'channel',
      },
      {
        dataIndex: 'actions',
        key: 'actions',
        render: () => (
          <Dropdown overlay={itemMenu}>
            <Icon className="ic-config" type="ellipsis" />
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
        this.setState({
          selectedProducts: selectedRows,
        });
      },
    };

    const { selectedProducts } = this.state;
    const { channelProducts } = this.props;
    console.log(this.props);
    return (
      <Fragment>
        <PrivatePageHeader title="Produtos a Venda" />
        <Row type="flex" gutter={24}>
          <Col xs={24} sm={24} md={24} lg={24} xl={17}>
            <SummaryProducts />
            <SynchronizeProducts selectedProducts={selectedProducts} />
            <PrivatePageSection>
              <StandardTable
                minWidth={1000}
                rowSelection={rowSelection}
                dataSource={channelProducts.results}
                columns={columns}
                rowKey={(record) => record.idProduct}
              />
            </PrivatePageSection>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={7}>
            <PrivatePageSection>
              <FilterForm />
            </PrivatePageSection>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  channelProducts: channelProductsSelectors.makeSelectChannelProducts(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(channelProductsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SalesProductsPage);
