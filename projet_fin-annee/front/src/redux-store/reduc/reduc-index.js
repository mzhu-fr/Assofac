import { combineReducers } from "redux";
import { sidebar } from './reduc-sidebar';

export const rootReducer = combineReducers({
    sidebar: sidebar,
})