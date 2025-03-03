import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "User",
  bio: "Meme Lover",
  profilePic: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;
