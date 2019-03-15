import types from './types';

const initialState = {
  isMobile: false,
  isCollapsed: false,
  breakpoint: 'lg',
};

export default function layoutReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case types.HANDLE_MOBILE:
      return {
        ...state,
        isMobile: action.isMobile,
      };
    case types.HANDLE_SIDER_COLLAPSED:
      return {
        ...state,
        isCollapsed: action.value,
      };
    case types.HANDLE_BREAKPOINT_CHANGE:
      return {
        ...state,
        breakpoint: action.breakpoint,
      };
    default:
      return state;
  }
}
