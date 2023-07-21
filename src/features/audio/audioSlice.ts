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
  audios: AUDIO[];
  isPlaying: boolean;
  playingSong: AUDIO;
}

const initialState: AUDIO_STATE = {
  //   audioBooks: [],
  //   songs: [],
  audios: [],
  playingSong: initAudio,
  isLoading: false,
  isPlaying: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudios.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAudios.fulfilled, (state, action) => {
        state.audios = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setIsPlaying, setPlayingSong } = audioCounter.actions;
export default audioCounter.reducer;
