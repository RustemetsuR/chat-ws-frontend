import { push } from "connected-react-router";
import {
  ADD_ONLINE_USER_FAILURE,
  ADD_ONLINE_USER_SUCCESS,
  DELETE_ONLINE_USER_FAILURE,
  DELETE_ONLINE_USER_SUCCESS,
  GET_USERS_FAILURE,
  GET_USERS_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS
} from "../actionTypes";
import axiosApi from "../../axiosApi";

const registerUserSuccess = () => {
  return { type: REGISTER_USER_SUCCESS };
};
const registerUserFailure = error => {
  return { type: REGISTER_USER_FAILURE, error };
};

const getOnlineUsersSuccess = value => {
  return { type: GET_USERS_SUCCESS, value };
};

const getOnlineUsersFailure = error => {
  return { type: GET_USERS_FAILURE, error };
};

const addOnlineUserSuccess = () => {
  return { type: ADD_ONLINE_USER_SUCCESS };
};

const addOnlineUserFailure = error => {
  return { type: ADD_ONLINE_USER_FAILURE, error };
};

const deleteOnlineUserSuccess = () => {
  return { type: DELETE_ONLINE_USER_SUCCESS };
};

const deleteOnlineUserFailure = error => {
  return { type: DELETE_ONLINE_USER_FAILURE, error };
};

export const registerUser = userData => {
  return async dispatch => {
    try {
      await axiosApi.post("/users", userData);
      dispatch(registerUserSuccess());
      dispatch(push("/login"));
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(registerUserFailure(e.response.data.errors.username.message));
      } else {
        dispatch(registerUserFailure({ global: "No internet" }));
      }
    }
  }
};

const loginUserSuccess = user => {
  return { type: LOGIN_USER_SUCCESS, user };
};
const loginUserFailure = error => {
  return { type: LOGIN_USER_FAILURE, error };
};

export const loginUser = userData => {
  return async dispatch => {
    try {
      const response = await axiosApi.post("/users/sessions", userData);
      dispatch(loginUserSuccess(response.data));
      dispatch(push("/chat"));
    } catch (e) {
      dispatch(loginUserFailure(e.response.data));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch, getState) => {
    const token = getState().users.user.token;
    const headers = { "Authorization": token };

    await axiosApi.delete("/users/sessions", { headers });
    dispatch({ type: LOGOUT_USER });
    dispatch(push("/login"));
  };
};

export const getOnlineUsers = () => {
  return async dispatch => {
    try {
      const response = await axiosApi.get("/onlineUsers");
      dispatch(getOnlineUsersSuccess(response.data));
    } catch (e) {
      dispatch(getOnlineUsersFailure(e.response.data));
    };
  };
};

export const addOnlineUser = (data) => {
  return async (dispatch, getState) => {
    try {
      const headers = {
        "Authorization": getState().users.user.token,
      };
      const response = await axiosApi.post("/onlineUsers", data, {headers});
      dispatch(addOnlineUserSuccess(response.data));
    } catch (e) {
      dispatch(addOnlineUserFailure(e.response.data));
    };
  };
};

export const deleteOnlineUser = () =>{
  return async (dispatch, getState) => {
    try {
      const headers = {
        "Authorization": getState().users.user.token,
      };
      await axiosApi.delete("/onlineUsers", {headers});
      dispatch(deleteOnlineUserSuccess());
    } catch (e) {
      dispatch(deleteOnlineUserFailure(e.response.data));
    };
  };
}
