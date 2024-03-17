import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from "./reduc/reduc-index.js";
import productReducer from '../pages/Panier/Panier.js'

const store = configureStore(
    { reducer: rootReducer }
)

export default store;