import { getSongs } from "@/services/songs";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAudios = createAsyncThunk(
  "audios/fetchAudios",
  async (props: GET_SONGS_QUERY_PROPS) => {
    const res = await getSongs(props);

    return res.results;
  }
);
