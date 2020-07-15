
let initState = [];

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return action.payload;

    default:
      break;
  }

  return state;
};

export default usersReducer;
