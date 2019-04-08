/* eslint-disable */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Popover, Badge, Icon, List } from 'antd';

import {
  notificationsActions,
  notificationsSelectors,
} from '../../../../../../../../state/ducks/notifications';

import './style.less';

class NotificationsPopover extends Component {
  state = { total: null };
  componentDidMount = async () => {
    const {
      actions: { listNotifications },
    } = this.props;
    const result = await listNotifications();
    if (!result.error) {
      const {
        payload: { totalNotViewed },
      } = result;
      this.setState({
        total: totalNotViewed,
      });
    }
    console.log(result.payload);
  };

  renderHeader = () => {
    return <div style={{ textAlign: 'center' }}>Notificações</div>;
  };

  handleNotificationClick = async (item) => {
    const {
      history: { push },
    } = this.props;
    const { type, idEntity } = item;
    console.log(type);
    console.log(idEntity);
    switch (type) {
      case 0:
        push({
          pathname: '/products/shipped',
          state: {
            seller: idEntity,
          },
        });
        break;
      case 1:
        push({
          pathname: '/products/shipped',
          state: {
            updateStatus: idEntity,
            seller: 'dsdasd',
          },
        });
        break;
      case 2:
        push({
          pathname: '/products/sales',
          state: {
            updateStatus: idEntity,
            company: 'dsdasd',
          },
        });
        break;
      case 3:
        push(`/orders/${idEntity}`);
        break;
      case 4:
        push(`/orders/${idEntity}`);
        break;
      case 5:
        push(`/orders/${idEntity}`);
        break;
      case 6:
        push({
          pathname: '/products/sales',
          state: {
            updateStatus: idEntity,
            company: 'dsdasd',
          },
        });
        break;
      default:
        console.log('aqui');
        push('/orders');
    }
  };

  handleViewNotifications = async () => {
    const {
      actions: { viewNotification },
    } = this.props;
    const result = await viewNotification();
    if (!result.error) {
      this.setState({
        total: 0,
      });
    }
  };

  renderListItem = (item) => (
    <List.Item
      key={item.id}
      className="item"
      onClick={() => this.handleNotificationClick(item)}
    >
      <List.Item.Meta
        // title={item.title}
        description={
          <div className="notifications clearfix">
            <div className="line" />
            <div className="notification">
              <div className="circle" />
              <span className="time">{item.updatedAt}</span>
              <p>{item.description}</p>
            </div>
          </div>
        }
      />
    </List.Item>
  );

  render() {
    const {
      items,
      items: { totalNotViewed },
    } = this.props;
    const { total } = this.state;
    console.log(items);
    return (
      <Popover
        content={
          <div className="notifications">
            <List
              header={this.renderHeader()}
              // footer={this.renderFooter()}
              dataSource={items.results}
              renderItem={this.renderListItem}
              locale={{
                emptyText: <div>Sem notificações recentes</div>,
              }}
            />
          </div>
        }
        placement="bottomRight"
        trigger={['click']}
      >
        <span className="action account">
          <Badge
            count={total}
            style={{ backgroundColor: '#ce5652' }}
            onClick={this.handleViewNotifications}
          >
            <Icon
              type="bell"
              style={{ fontSize: '14px', padding: '6px', color: '#656565' }}
            />
          </Badge>
        </span>
      </Popover>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // total: notificationsSelectors.makeSelectTotal(),
  items: notificationsSelectors.makeSelectNotifications(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(notificationsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(NotificationsPopover);
