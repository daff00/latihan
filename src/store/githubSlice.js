import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Redux Thunk untuk mengambil data profil dan repositori secara bersamaan
export const fetchGithubUser = createAsyncThunk(
  "github/fetchUser",
  async (username, { rejectWithValue }) => {
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error("Pengguna tidak ditemukan");
      const userData = await userRes.json();

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
      const reposData = await reposRes.json();

      return { profile: userData, repos: reposData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const githubSlice = createSlice({
  name: "github",
  initialState: {
    profile: null,
    repos: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearGithubData: (state) => {
      state.profile = null;
      state.repos = [];
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGithubUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGithubUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload.profile;
        state.repos = action.payload.repos;
      })
      .addCase(fetchGithubUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.profile = null;
        state.repos = [];
      });
  },
});

export const { clearGithubData } = githubSlice.actions;
export default githubSlice.reducer;