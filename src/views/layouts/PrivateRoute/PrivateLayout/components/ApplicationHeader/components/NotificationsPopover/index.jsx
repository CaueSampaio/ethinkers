/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Popover, Badge, Icon, List, Spin, message, Row } from 'antd';
import { isEmpty, debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';

import {
  notificationsActions,
  notificationsSelectors,
} from '../../../../../../../../state/ducks/notifications';

import './style.less';

class NotificationsPopover extends Component {
  constructor(props) {
    super(props);
    this.fetchNotifications = debounce(this.fetchNotifications, 800);
  }

  state = { total: null, data: [], loading: false, hasMore: true };

  componentDidMount = async () => {
    const {
      actions: { listNotifications },
    } = this.props;
    const result = await listNotifications();
    if (!result.error) {
      const {
        payload: { totalNotViewed },
      } = result;

      await this.setState({
        total: totalNotViewed,
        data: this.props.items.results,
      });
    }
  };

  renderHeader = () => {
    return (
      <div className="header-notifications">
        <span style={{ marginLeft: 5 }}>NOTIFICAÇÕES</span>
        <Icon type="mail" />
      </div>
    );
  };

  handleNotificationClick = async (item) => {
    const {
      history: { push },
    } = this.props;
    const { type, idEntity } = item;
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
            seller: idEntity,
          },
        });
        break;
      case 2:
        push({
          pathname: '/products/sales',
          state: {
            updateStatus: 1,
            company: idEntity,
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
        push(`/orders/${idEntity}`);
        break;
      case 7:
        push(`/orders/${idEntity}`);
        break;
      default:
        push('/orders');
    }
  };

  handleViewNotifications = async () => {
    const {
      actions: { viewNotification, listNotifications },
    } = this.props;

    await listNotifications();
    const result = await viewNotification();
    if (!result.error) {
      this.setState({
        hasMore: true,
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
        description={
          <div className="notifications">
            <div className="notification">
              <span className="time">
                {moment(item.updatedAt).format('DD/MM/YYYY')}
              </span>
              <Row>{item.description}</Row>
              <Row className="relative-time">
                {moment(item.updatedAt)
                  .startOf('hour')
                  .fromNow()}
              </Row>
            </div>
          </div>
        }
      />
    </List.Item>
  );

  handleInfiniteOnLoad = async () => {
    const { data } = this.state;
    const {
      actions: { listNotifications },
    } = this.props;
    const lastItem = data[data.length - 1];

    await this.setState({
      loading: true,
    });

    const params = { lastId: lastItem.id };

    const newNotifications = await listNotifications(params);
    const {
      payload: { results },
    } = newNotifications;

    await this.setState({
      data: [...this.state.data, ...results],
      loading: false,
    });

    if (isEmpty(results)) {
      await this.setState({
        hasMore: false,
      });
    }
  };

  fetchNotifications = () => {
    const {
      actions: { listNotifications },
    } = this.props;
    const params = { lastId: lastItem.id };

    listNotifications(params);
  };

  render() {
    const {
      items,
      items: { totalNotViewed },
    } = this.props;
    const { total, data } = this.state;

    return (
      <Popover
        content={
          <div className="notifications">
            <div className="demo-infinite-container">
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && this.state.hasMore}
                useWindow={false}
                style={{ width: 270 }}
              >
                <List
                  header={this.renderHeader()}
                  // footer={this.renderFooter()}
                  dataSource={data}
                  renderItem={this.renderListItem}
                  locale={{
                    emptyText: <div>Sem notificações recentes</div>,
                  }}
                >
                  {this.state.loading && this.state.hasMore && (
                    <div
                      className="spinner"
                      style={{
                        bottom: '40px',
                        textAlign: 'center',
                        width: '100%',
                      }}
                    >
                      <Spin />
                    </div>
                  )}
                </List>
              </InfiniteScroll>
            </div>
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
