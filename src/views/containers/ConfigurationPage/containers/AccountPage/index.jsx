/*eslint-disable*/
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Form, notification, Button } from 'antd';

import {
  loggedUserActions,
  loggedUserSelectors,
} from '../../../../../state/ducks/loggedUser';
import { userActions, userSelectors } from '../../../../../state/ducks/user';

import PrivatePageSection from '../../../../components/PrivatePageSection';
import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PasswordFormFields from '../../../../components/PasswordFormFields';

import './style.less';

class AccountPage extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  };

  state = {};

  onSubmit = (e) => {
    e.preventDefault();

    const {
      form: { validateFields },
      actions: { updateUserPassword },
      userData: { token },
    } = this.props;
    validateFields(async (err, values) => {
      if (err) return;
      const params = {
        ...values,
        token,
      };
      const result = await updateUserPassword(params);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'Senha alterada com sucesso',
        });
      } else {
        const { message: errorMessage, errors } = updateError;

        notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
      }
    });
  };

  render() {
    const { form, updateIsLoading } = this.props;
    return (
      <Fragment>
        <PrivatePageHeader title="Alterar Senha" />
        <PrivatePageSection>
          <Row>
            <Col>
              <div className="account-content">
                <Form>
                  <Row>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <PasswordFormFields
                        form={form}
                        labelCol={null}
                        wrapperCol={null}
                        passwordFieldName="password"
                        passwordLabel="Nova Senha"
                      />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start">
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                      <Form.Item>
                        <Button
                          loading={updateIsLoading}
                          style={{ borderRadius: 20, marginTop: 10 }}
                          type="primary"
                          htmlType="submit"
                          onClick={this.onSubmit}
                        >
                          Atualizar
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </PrivatePageSection>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userData: userSelectors.makeSelectUserData(),

  updateIsLoading: loggedUserSelectors.makeSelectUpdatePasswordIsLoading(),
  updateError: loggedUserSelectors.makeSelectUpdatePasswordError(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { ...userActions, ...loggedUserActions },
    dispatch,
  ),
});

const withForm = Form.create();
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withForm,
  withConnect,
)(AccountPage);
