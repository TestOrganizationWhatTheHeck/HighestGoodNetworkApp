const initialState = {
  darkMode: false,
};

// eslint-disable-next-line default-param-last
export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
}
