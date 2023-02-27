import React from 'react';
import ReactDOM from 'react-dom/client';
import {configureStore,} from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import App from './App';
import productsSlice, { productsFetch } from './features/productsSlice';
import { productsApi } from './features/productsApi';
import cartSlice, { getToatl } from './features/cartSlice';
import authSlice, { loadUser } from './features/authSlice';
import ordersSlice from './features/ordersSlice';
import userSlice from './features/userSlice'
import searchSlice, { serachItem } from './features/searchSlice';
const store=configureStore({
  reducer:{
    products:productsSlice,
    [productsApi.reducerPath]:productsApi.reducer,
    cart:cartSlice,
    users:userSlice,
   auth:authSlice,
   orders:ordersSlice,
   search:searchSlice
  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(productsApi.middleware)
  
})

store.dispatch(productsFetch())
store.dispatch(getToatl())
store.dispatch(loadUser(null))
store.dispatch(serachItem())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);



