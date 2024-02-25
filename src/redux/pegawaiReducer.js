import { combineReducers } from "@reduxjs/toolkit";
import pegawaiReducer from "./pegawaiSlice";

const rootReducer = combineReducers({
  pegawai: pegawaiReducer,
});

export default rootReducer;
