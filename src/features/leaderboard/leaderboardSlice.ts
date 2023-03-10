import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchLeaderboardData } from "./leaderboardQueries";

export type LeaderboardState = {
  loading: boolean;
  error: string;
  challengeType: string;
  timeInterval: string;
  page: number;
  page_count: number | undefined;
  entries: Array<{ name: string; checkins: number }>;
};

const initialState: LeaderboardState = {
  loading: false,
  error: "",
  challengeType: "Sleep",
  timeInterval: "Weekly",
  page: 0,
  page_count: 2,
  entries: [],
};

/**
 * Fetches the leaderboard entries from the database
 * @returns {Promise<GraphQLResult<Leaderboard>>} The leaderboard entries as  {name: string, checkins: number}
 */
export const fetchLeaderboard = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(
  "leaderboard/fetch",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { challengeType, page } = state.leaderboard;
      return fetchLeaderboardData(challengeType, page);
    } catch (error: any) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { leaderboard } = getState() as RootState;
      if (
        leaderboard.page_count &&
        leaderboard.page == leaderboard.page_count
      ) {
        return false;
      }

      if (leaderboard.error.length > 0) {
        return false;
      }
    },
  }
);

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    changeSetting: (
      state: LeaderboardState,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      const { name, value } = action.payload;

      if (state[name as keyof LeaderboardState] == value) {
        return;
      }

      state[name as keyof LeaderboardState] = value as never;
      state.page = 0;
      state.entries = [];
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchLeaderboard.fulfilled,
      (state: LeaderboardState, action: PayloadAction<any>) => {
        state.page += 1;
        state.loading = false;
        state.error = "";
        state.entries = action.payload;
      }
    );
    builder.addCase(fetchLeaderboard.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      fetchLeaderboard.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { changeSetting } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
