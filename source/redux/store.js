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
  },

  reducers: {
    update_user: (state, action) => {
      state.user = state.user
        ? {...state.user, ...action.payload}
        : action.payload;
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

export const {update_user} = authSlice.actions;
