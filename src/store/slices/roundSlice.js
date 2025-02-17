import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roundsCount: 1,
};

const roundsSlice = createSlice({
  name: "rounds",
  initialState,
  reducers: {
    resetRoundsCount: (state) => {
      state.roundsCount = 1;
    },
    incrementRoundsCount: (state) => {
      state.roundsCount += 1;
    },
  },
});

export const { resetRoundsCount, incrementRoundsCount } = roundsSlice.actions;
export default roundsSlice.reducer;
