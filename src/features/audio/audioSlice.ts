import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAudios } from "./audioThunk";
import { AUDIO } from "./types";
import { initialState } from "./initialState";

const audioCounter = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setPlayingSong: (state, action: PayloadAction<AUDIO>) => {
      state.playingSong = action.payload;
    },
    setSearchParam: (state, action: PayloadAction<string>) => {
      state.searchParam = action.payload;
    },
    setOffsetParam: (state, action: PayloadAction<number>) => {
      state.offsetParam = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudios.pending, (state, action) => {
        if ((action?.meta?.arg?.offset as number) > 1) {
          state.isOffsetLoading = true;
          return;
        }

        state.audios = [];
        state.isLoading = true;
      })
      .addCase(fetchAudios.fulfilled, (state, action) => {
        if ((action.meta.arg.offset as number) > 1) {
          state.audios.push(...action.payload);
        } else {
          state.audios = action.payload;
        }

        state.isLoading = false;
        state.isOffsetLoading = false;
        state.error = "";
      })
      .addCase(fetchAudios.rejected, (state, action) => {
        state.isLoading = false;
        state.isOffsetLoading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { setIsPlaying, setPlayingSong, setSearchParam, setOffsetParam } =
  audioCounter.actions;
export default audioCounter.reducer;
