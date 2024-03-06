import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from "./reduc/reduc-index.js";

const store = configureStore(
    { reducer: rootReducer }
)

export default store;