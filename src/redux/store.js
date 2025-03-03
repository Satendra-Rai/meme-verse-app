import { configureStore } from "@reduxjs/toolkit";
import memeReducer from "./memeSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    memes: memeReducer,
    user: userReducer,
  },
});

export default store;
