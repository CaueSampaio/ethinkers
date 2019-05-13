/*eslint-disable*/
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Card, List, Icon, Spin, notification, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import {
  userActions,
  userSelectors,
  userUtils,
} from '../../../state/ducks/user';

import './style.less';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { confirm } = Modal;

class OrderDetailsPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
  };

  state = {
    users: [],
  };

  componentWillMount() {
    let totalUsers = [];

    const {
      actions: { getUsers },
    } = this.props;
    getUsers().then((response) => {
      const { payload } = response;
      payload.forEach((item) => {
        totalUsers.push(item);
      });
      if (!!JSON.parse(localStorage.getItem('users'))) {
        JSON.parse(localStorage.getItem('users')).forEach((user) => {
          totalUsers.push(user);
        });
      }
      this.setState({
        users: totalUsers,
      });
    });
  }

  handleDelete = (user) => {
    const { users } = this.state;
    const pos = users.map(function(e) { return e.cpf; }).indexOf(user);
    confirm({
      title: 'Deseja realmente excluir o usuario?',
      okText: 'Confirmar',
      content: 'Este usuario sera excluido.',
      onOk: () => {
        users.splice(pos, 1);
        this.setState({
          users,
        });
        const newUsers = [...users];
        const newLocalStorageData = newUsers.splice(3, users.length - 3);
        localStorage.setItem('users', JSON.stringify(newLocalStorageData));
        notification.success({
          message: 'Sucesso',
          description: 'Usuario excluido com sucesso.',
        });
      },
    });
  };

  render() {
    const { users } = this.state;
    return (
      <>
        {isEmpty(users) ? antIcon : null}
        <List
          className="user-list"
          rowKey={'id'}
          grid={{ gutter: 24, lg: 1, md: 1, sm: 1, xs: 1 }}
          dataSource={[...users]}
          renderItem={(user) => {
            const cpf = user.cpf;
            return (
              <List.Item key={user.nome}>
                <Card
                  className="user-card"
                  size="small"
                  title={`${user.firstname} ${user.lastname}`}
                >
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                  <p>CPF: {user.cpf}</p>
                  <Button
                    onClick={(e) => {
                      this.handleDelete(cpf);
                    }}
                  >
                    Excluir
                  </Button>
                </Card>
              </List.Item>
            );
          }}
        />
        <Link to="/">Cadastrar novo usuario</Link>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  users: userSelectors.makeSelectUsers(),
  isLoading: userSelectors.makeSelectUserLoading(),
  error: userSelectors.makeSelectUserError(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OrderDetailsPage);
