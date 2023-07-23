import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAudios } from "./audioThunk";

export interface AUDIO {
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionCensoredName: string;
  collectionExplicitness: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionViewUrl: string;
  country: string;
  currency: string;
  discCount: number;
  discNumber: number;
  isStreamable: boolean;
  kind: string;
  previewUrl: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCensoredName: string;
  trackCount: number;
  trackExplicitness: string;
  trackId: number;
  trackName: string;
  trackNumber: number;
  trackPrice: number;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
  copyright: string;
  description: string;
}

export const initAudio: AUDIO = {
  artistId: 0,
  artistName: "",
  artistViewUrl: "",
  artworkUrl30: "",
  artworkUrl60: "",
  artworkUrl100: "",
  collectionCensoredName: "",
  collectionExplicitness: "",
  collectionId: 0,
  collectionName: "",
  collectionPrice: 0,
  collectionViewUrl: "",
  country: "",
  currency: "",
  discCount: 0,
  discNumber: 0,
  isStreamable: false,
  kind: "",
  previewUrl: "",
  primaryGenreName: "",
  releaseDate: "",
  trackCensoredName: "",
  trackCount: 0,
  trackExplicitness: "",
  trackId: 0,
  trackName: "",
  trackNumber: 0,
  trackPrice: 0,
  trackTimeMillis: 0,
  trackViewUrl: "",
  wrapperType: "",
  copyright: "",
  description: "",
};

interface AUDIO_STATE {
  //   songs: any[];
  //   audioBooks: any[];
  isLoading: boolean;
  isOffsetLoading: boolean;
  audios: AUDIO[];
  isPlaying: boolean;
  playingSong: AUDIO;
  error: string;
  searchParam: string;
  offsetParam: number;
}

const initialState: AUDIO_STATE = {
  //   audioBooks: [],
  //   songs: [],
  audios: [],
  playingSong: initAudio,
  isLoading: false,
  isOffsetLoading: false,
  isPlaying: false,
  error: "",
  searchParam: "eminem",
  offsetParam: 1,
};

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
        state.searchParam = action.meta.arg.searchTerm || "eminem";
        // state.offsetParam = action.meta.arg.offset as number;

        if ((action?.meta?.arg?.offset as number) > 1) {
          state.isOffsetLoading = true;
        } else {
          state.isLoading = true;
        }
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
