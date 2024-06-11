import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore, createSlice} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    current_city: null,
    is_installed: false,
    is_unauthenticated: false,
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.is_unauthenticated = false;
    },
    logout: state => {
      state.user = null;
      state.is_unauthenticated = false;
    },
    update: (state, action) => {
      state.user.user = {...state.user.user, ...action.payload};
    },
    update_is_installed: state => {
      state.is_installed = true;
    },
    update_is_unauthenticated: state => {
      state.is_unauthenticated = true;
    },
  },
});

const combineReducer = combineReducers({
  auth: authSlice.reducer,
});

const persistReducers = persistReducer(persistConfig, combineReducer);

const store = configureStore({
  reducer: persistReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);

export const {
  login,
  logout,
  update,
  update_city,
  update_is_installed,
  update_is_unauthenticated,
} = authSlice.actions;
