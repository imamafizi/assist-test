import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPegawai = createAsyncThunk(
  "pegawai/fetchPegawai",
  async () => {
    const response = await axios.get(
      "https://61601920faa03600179fb8d2.mockapi.io/pegawai"
    );
    return response.data;
  }
);

export const createPegawai = createAsyncThunk(
  "pegawai/createPegawai",
  async (pegawai) => {
    const response = await axios.post(
      "https://61601920faa03600179fb8d2.mockapi.io/pegawai",
      pegawai
    );
    return response.data;
  }
);

export const updatePegawai = createAsyncThunk(
  "pegawai/updatePegawai",
  async ({ id, pegawai }) => {
    const response = await axios.put(
      `https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`,
      pegawai
    );
    return response.data;
  }
);

export const deletePegawai = createAsyncThunk(
  "pegawai/deletePegawai",
  async (id) => {
    await axios.delete(
      `https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`
    );
    return id;
  }
);

export const addpegawai = createAsyncThunk(
  "pegawai/addpegawai",
  async (pegawai) => {
    const response = await axios.post(
      "https://www.emsifa.com/api-wilayah-indonesia/api/pegawais",
      pegawai
    );
    return response.data;
  }
);
const pegawaiSlice = createSlice({
  name: "pegawai",
  initialState: {
    entities: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPegawai.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPegawai.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(fetchPegawai.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPegawai.fulfilled, (state, action) => {
        state.entities.push(action.payload);
      })
      .addCase(updatePegawai.fulfilled, (state, action) => {
        const index = state.entities.findIndex(
          (pegawai) => pegawai.id === action.payload.id
        );
        state.entities[index] = action.payload;
      })
      .addCase(deletePegawai.fulfilled, (state, action) => {
        return {
          ...state,
          entities: state.entities.filter(
            (pegawai) => pegawai.id !== action.payload
          ),
        };
      });
  },
});

export default pegawaiSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit'

// export const usersSlice = createSlice({
//   name: 'users',
//   initialState: {
//     id: null,
//     username: "",
//     email: "",
//   },
//   reducers: {
//     loginAction: (state, action) => {
//       state.id = action.payload.id;
//       state.username = action.payload.username;
//       state.email = action.payload.email;
//     },
//     logoutAction: (state) => {
//       state.id = null;
//       state.username = "";
//       state.email = "";
//     },
//   },
// })

// // Action creators are generated for each case reducer function
// export const { loginAction, logoutAction } = usersSlice.actions;

// export default usersSlice.reducer
