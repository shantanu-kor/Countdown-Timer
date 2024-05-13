import { createSlice } from "@reduxjs/toolkit";

const intialTimerState = { time: 1 };

// for managing the time
const timerSlice = createSlice({
    name: "timer",
    initialState: intialTimerState,
    reducers: {
        setTime(state, action) {
            state.time = action.payload;
        }
    }
});

export const timerActions = timerSlice.actions;

export default timerSlice.reducer;