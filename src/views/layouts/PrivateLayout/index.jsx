import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { isUndefined } from 'lodash';
import classNames from 'classnames';
import { ContainerQuery } from 'react-container-query';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';

import { getBreadCrumb } from '../../../routes';

// import { getAllDiscriminators } from '../../../../utils/constants';

import {
  layoutActions,
  layoutSelectors,
  layoutUtils,
} from '../../../state/ducks/layout';

// import { userSelectors } from '../../../../state/ducks/user';

// import logo from '../../../../assets/images/logo-ic.svg';
import SiderMenu from './components/SiderMenu';
import ApplicationHeader from './components/ApplicationHeader';
// import ApplicationFooter from './components/ApplicationFooter';

const { Header, Content, Footer } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class PrivateLayout extends React.Component {
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.instanceOf(React.Component),
      PropTypes.func,
    ]).isRequired,
    actions: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    discriminators: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {};

  componentDidMount() {
    this.enquireHandler = enquireScreen((mobile) => {
      const {
        actions: { handleMobile },
      } = this.props;
      handleMobile(!isUndefined(mobile));
    });

    this.registerHandlers();
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
    this.unregisterHandlers();
  }

  registerHandlers = () => {
    const {
      actions: { handleBreakpointChange },
    } = this.props;

    // xs
    this.enquireXs = enquireScreen((check) => {
      if (check) handleBreakpointChange('xs');
    }, 'only screen and (max-width: 576px)');
    // sm
    this.enquireSm = enquireScreen((check) => {
      if (check) handleBreakpointChange('sm');
    }, 'only screen and (min-width: 576px) and (max-width: 768px)');
    // md
    this.enquireMd = enquireScreen((check) => {
      if (check) handleBreakpointChange('md');
    }, 'only screen and (min-width: 768px) and (max-width: 992px)');
    // lg
    this.enquireLg = enquireScreen((check) => {
      if (check) handleBreakpointChange('lg');
    }, 'only screen and (min-width: 992px) and (max-width: 1200px)');
    // xl
    this.enquireXl = enquireScreen((check) => {
      if (check) handleBreakpointChange('xl');
    }, 'only screen and (min-width: 1200px) and (max-width: 1600px)');
    // xxl
    this.enquireXxl = enquireScreen((check) => {
      if (check) handleBreakpointChange('xxl');
    }, 'only screen and (min-width: 1600px)');
  };

  unregisterHandlers = () => {
    unenquireScreen(this.enquireXs);
    unenquireScreen(this.enquireSm);
    unenquireScreen(this.enquireMd);
    unenquireScreen(this.enquireLg);
    unenquireScreen(this.enquireXl);
    unenquireScreen(this.enquireXxl);
  };

  handleMenuCollapse = (collapsed) => {
    const {
      actions: { handleSiderCollapsed },
    } = this.props;
    handleSiderCollapsed(collapsed);
  };

  render() {
    const {
      isMobile,
      isCollapsed,
      path,
      location,
      component: Component,
      ...rest
    } = this.props;
    return (
      <ContainerQuery query={query}>
        {(params) => (
          <div className={classNames(params)}>
            <Helmet titleTemplate="%s | it4solution">
              <title>{getBreadCrumb(path)}</title>
            </Helmet>
            <Layout>
              <SiderMenu
                // logo={logo}
                isMobile={isMobile}
                isCollapsed={isCollapsed}
                onCollapse={this.handleMenuCollapse}
                menuData={layoutUtils.getMenuData()}
                location={location}
              />
              <Layout>
                <Header style={{ padding: 0 }}>
                  <ApplicationHeader
                    isMobile={isMobile}
                    isCollapsed={isCollapsed}
                    onCollapse={this.handleMenuCollapse}
                  />
                </Header>
                <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                  <Component {...rest} />
                </Content>
                <Footer style={{ padding: 0 }}>
                  {/*                   <ApplicationFooter />
                   */}
                </Footer>
              </Layout>
            </Layout>
          </div>
        )}
      </ContainerQuery>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isMobile: layoutSelectors.makeSelectIsMobile(),
  isCollapsed: layoutSelectors.makeSelectIsCollapsed(),
  breakpoint: layoutSelectors.makeSelectBreakpoint(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(layoutActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(PrivateLayout);
