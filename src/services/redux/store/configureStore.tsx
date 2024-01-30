import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import { persistReducer, persistStore } from "redux-persist";
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];

if(__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = createStore(
  persistedReducer,
  undefined,
  applyMiddleware(...middlewares),
);
export const persistor = persistStore(store);

export const clearPersistedReduxData = persistor.purge;

export type AppDispatch = typeof store.dispatch;
