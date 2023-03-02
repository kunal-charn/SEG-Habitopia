import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DataStore } from "aws-amplify";
import { Settings } from "../../../types";
import { getAuthTokenFromThunk } from "../../app/util";
import { getUserFromDatabase } from "../../app/util";
import { User } from "../../models";
import { updatePassword } from "../auth/authSlice";

export type SettingsState = {
  settings: Settings;
  fetchSettings: {
    loading: boolean;
    error: string;
  };
  setSettings: {
    loading: boolean;
    error: string;
  };
};

const initialState: SettingsState = {
  settings: {
    email: "",
    password: "",
    notifications: false,
    name: "",
    biography: "",
  },
  fetchSettings: {
    loading: false,
    error: "",
  },
  setSettings: {
    loading: false,
    error: "",
  },
};

export const fetchSettings = createAsyncThunk<
  Settings,
  void,
  { rejectValue: string }
>("settings/fetch", async (_, thunkAPI) => {
  try {
    const userData  = await getUserFromDatabase(thunkAPI);

    const response =  {
      email: userData.email,
      name: userData.name,
      notifications: userData.notifications,
      biography: userData.biography,
    };
   
    return (await response) as Settings;
  } catch (error: any) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message);
  }
});


export const setSettings = createAsyncThunk<
  void,
  object,
  { rejectValue: string }
>("settings/set", async (settings: any, thunkAPI) => {
  try {
    const name = settings.name;
    const email = settings.email;
    const notifications = settings.notifications;
    const biography = settings.biography;
    const password = settings.password;
    const user = await getUserFromDatabase(thunkAPI);
    // update the one that is not null
    await DataStore.save(
      User.copyOf(user, (updated) => {
        if (name !== undefined) {
          updated.name = name;
        }
        if (email !== undefined) {
          updated.email = email;
        }
        if (notifications !== undefined) {
          updated.notifications = notifications;
        }
        if (biography !== undefined) {
          updated.biography = biography;
        }
        if (password !== undefined) {
          updatePassword(password, thunkAPI);
        }
      }));

    // could add image and password in future
    return settings; 
  } catch (error: any) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSettings.fulfilled,
      (state: SettingsState, action: PayloadAction<Settings>) => {
        state.settings = action.payload;
        state.fetchSettings.loading = false;
        state.fetchSettings.error = "";
      }
    );
    builder.addCase(fetchSettings.pending, (state: SettingsState) => {
      state.fetchSettings.loading = true;
      state.fetchSettings.error = "";
    });
    builder.addCase(
      fetchSettings.rejected,
      (state: SettingsState, action: PayloadAction<any>) => {
        state.fetchSettings.loading = false;
        state.fetchSettings.error = action.payload.message;
      }
    );
    builder.addCase(
      setSettings.fulfilled,
      (state: SettingsState, action: PayloadAction<any>) => {
        state.settings = { ...state.settings, ...action.payload };
        state.setSettings.loading = false;
      }
    );
    builder.addCase(setSettings.pending, (state: SettingsState) => {
      state.setSettings.loading = true;
    });
    builder.addCase(setSettings.rejected, (state: SettingsState) => {
      state.setSettings.loading = false;
    });
  },
});

export const {} = settingsSlice.actions;

export default settingsSlice.reducer;
