import validateToken from '../helpers/validateToken';

let initState = {
  user: {},
  isAuthenticated: false
};

if(validateToken().status){
  initState = {
    user: validateToken().decoded,
    isAuthenticated: true
  }
}


const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        user: action.payload,
        isAuthenticated: true
      };

    case "LOGOUT":
      return {
        user: {},
        isAuthenticated: false
      }
    default:
      break;
  }

  return state;
};

export default authReducer;
