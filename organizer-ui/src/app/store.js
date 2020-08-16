import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './root.reducer';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

export default createStore(rootReducer, {}, applyMiddleware(...middlewares));
