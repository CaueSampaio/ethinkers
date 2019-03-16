import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Table } from 'antd';

import { layoutSelectors, layoutUtils } from '../../../state/ducks/layout';

const StandardTable = ({ breakpoint, minWidth, scroll, ...rest }) => {
  const { findBreakpoint, getBreakpointNumber } = layoutUtils;

  const tableBreakpoint = getBreakpointNumber(findBreakpoint(minWidth)) + 1;
  const windowBreakpoint = getBreakpointNumber(breakpoint);

  const responsiveScroll = {
    ...scroll,
    x: tableBreakpoint > windowBreakpoint ? minWidth : 0,
  };
  return <Table {...rest} scroll={responsiveScroll} />;
};

StandardTable.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  minWidth: PropTypes.number.isRequired,
  scroll: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  breakpoint: layoutSelectors.makeSelectBreakpoint(),
});

export default connect(mapStateToProps)(StandardTable);
