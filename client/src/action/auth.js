import axios from "axios";
import jwtDecode from "jwt-decode";
import setHeaders from "../helpers/setHeaders";

export const createUser = data => {
  return dispatch => {
    axios
      .post("http://localhost:5000/api/users", data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err =>
        dispatch({
          type: "GET_ERRORS",
          payload: err.response.data
        })
      );
  };
};

export const login = data => {
  return dispatch => {
    axios
      .post("http://localhost:5000/api/users/login", data)
      .then(res => {
        const { token } = res.data;
        //đưa jwt len6 local storage

        localStorage.setItem("token", token);
        console.log(res.data);

        //decode => dispatch auth reducer

        const decoded = jwtDecode(token);
        dispatch({
          type: "SET_CURRENT_USER",
          payload: decoded
        });

        //set params cho requests sau
        setHeaders({ token });

        //test
        axios.get("http://localhost:5000/api/trips");
      })
      .catch(console.log);
  };
};

export const logout = () => {
  return (dispatch)=>{
    localStorage.removeItem('token')
    dispatch({type: "LOGOUT"})
    setHeaders({})
  }
}
