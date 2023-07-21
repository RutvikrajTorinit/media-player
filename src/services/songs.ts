import getAll from "./axios/getAll";

export interface GET_SONGS_QUERY_PROPS {
  offset?: number;
  searchTerm?: string;
}

export const getSongs = async (props: GET_SONGS_QUERY_PROPS) => {
  try {
    const { offset = 1, searchTerm = "top100" } = props;

    let query = "";

    if (offset) {
      query += `offset=${offset}&`;
    }

    query += `term=${searchTerm.length ? searchTerm : "top100"}&`;

    const res = await getAll({
      endPoint: `https://itunes.apple.com/search/?${query}limit=50`,
    });

    return res?.data;
  } catch (error: T) {
    throw new Error(error?.message);
  }
};
