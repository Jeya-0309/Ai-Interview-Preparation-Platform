import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import interviewService from "./interviewService";


const initialState = {
  interviews: [],
  isLoading: false,
  isError: false,
  message: "",
};


export const getInterviews =
  createAsyncThunk(
    "interview/getAll",
    async (_, thunkAPI) => {

      try {

        return await interviewService.getInterviews();

      } catch (error) {

        const message =
          error.response?.data?.message ||
          error.message;

        return thunkAPI.rejectWithValue(message);
      }
    }
  );


const interviewSlice = createSlice({
  name: "interview",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(getInterviews.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(
        getInterviews.fulfilled,
        (state, action) => {

          state.isLoading = false;

          state.interviews = action.payload;
        }
      )

      .addCase(
        getInterviews.rejected,
        (state, action) => {

          state.isLoading = false;

          state.isError = true;

          state.message = action.payload;
        }
      );
  },
});

export default interviewSlice.reducer;