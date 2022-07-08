const socketReducer = (state, action) => {
  switch (action.type) {
    case 'CONNECT_SOCKET':
      return action.payload;
    default:
      return state;
  }
};

export default socketReducer;
