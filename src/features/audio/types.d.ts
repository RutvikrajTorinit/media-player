export interface AUDIO_STATE {
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
