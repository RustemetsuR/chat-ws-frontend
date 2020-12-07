import {applyMiddleware, combineReducers, createStore} from "redux";
import {createBrowserHistory} from "history";
import usersReducer from "./reducers/usersReducer";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  users: usersReducer,
  router: connectRouter(history)
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
];

const enhancers = applyMiddleware(...middleware);

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
  saveToLocalStorage({
    users: {
      user: store.getState().users.user
    }
  });
});

export default store;