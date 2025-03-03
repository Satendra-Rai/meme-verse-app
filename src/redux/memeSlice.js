import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.imgflip.com/get_memes";

// Fetch all memes
export const fetchMemes = createAsyncThunk("memes/fetchMemes", async () => {
  const response = await axios.get(API_URL);
  return response.data.data.memes;
});

// Fetch meme details by ID
export const fetchMemeById = createAsyncThunk(
  "memes/fetchMemeById",
  async (id, { getState }) => {
    const { memes } = getState().memes;
    return memes.find((meme) => meme.id === id);
  }
);

const memeSlice = createSlice({
  name: "memes",
  initialState: {
    memes: [],
    selectedMeme: null,
    likes: {},
    comments: {},
    loading: false,
    error: null,
  },
  reducers: {
    addLike: (state, action) => {
      const id = action.payload;
      state.likes[id] = (state.likes[id] || 0) + 1;
      localStorage.setItem(`likes-${id}`, state.likes[id]);
    },
    addComment: (state, action) => {
      const { id, comment } = action.payload;
      if (!state.comments[id]) state.comments[id] = [];
      state.comments[id].push(comment);
      localStorage.setItem(
        `comments-${id}`,
        JSON.stringify(state.comments[id])
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.loading = false;
        state.memes = action.payload;
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMemeById.fulfilled, (state, action) => {
        state.selectedMeme = action.payload;
        state.likes[action.payload.id] =
          parseInt(localStorage.getItem(`likes-${action.payload.id}`)) || 0;
        state.comments[action.payload.id] =
          JSON.parse(localStorage.getItem(`comments-${action.payload.id}`)) ||
          [];
      });
  },
});

export const { addLike, addComment } = memeSlice.actions;
export default memeSlice.reducer;
