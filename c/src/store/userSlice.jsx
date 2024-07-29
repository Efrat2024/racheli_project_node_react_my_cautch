import { createSlice } from "@reduxjs/toolkit";

const initVal = {
    userName: "ploni almoni"
};

const userSlice = createSlice({
    name: "user",
    initialState: initVal,
    reducers: {
        changeUserName: (state, action) => {
            state.userName = action.payload;
        }
    }
});

export const { changeUserName } = userSlice.actions;
export default userSlice.reducer;