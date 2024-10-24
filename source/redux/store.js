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
    decline_to_rating: false,
  },

  reducers: {
    update_user: (state, action) => {
      state.user = state.user
        ? {...state.user, ...action.payload}
        : action.payload;
    },
    update_decline_to_rating: state => {
      state.decline_to_rating = true;
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

export const {update_user, update_decline_to_rating} = authSlice.actions;
