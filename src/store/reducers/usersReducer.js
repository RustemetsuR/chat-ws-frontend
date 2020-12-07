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

const initialState = {
  registerError: null,
  loginError: null,
  user: null,
  onlineUsers: null,
  onlineUsersError: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return { ...state, registerError: null };
    case REGISTER_USER_FAILURE:
      return { ...state, registerError: action.error };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.user, loginError: null };
    case LOGIN_USER_FAILURE:
      return { ...state, loginError: action.error };
    case LOGOUT_USER:
      return { ...state, user: null };
    case GET_USERS_SUCCESS:
      return { ...state, onlineUsers: action.value, onlineUsersError: null };
    case GET_USERS_FAILURE:
      return { ...state, onlineUsersError: action.error };
    case ADD_ONLINE_USER_SUCCESS:
      return { ...state, onlineUsersError: null };
    case ADD_ONLINE_USER_FAILURE:
      return { ...state, onlineUsersError: action.error };
    case DELETE_ONLINE_USER_SUCCESS:
      return { ...state, onlineUsersError: null };
    case DELETE_ONLINE_USER_FAILURE:
      return { ...state, onlineUsersError: action.error };
    default:
      return state;
  }
};

export default usersReducer;