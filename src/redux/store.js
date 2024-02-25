import { configureStore } from "@reduxjs/toolkit";
import pegawaiSlice from "./pegawaiSlice";

export default configureStore({
  reducer: {
    pegawai: pegawaiSlice,
  },
});
