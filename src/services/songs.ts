import getAll from "./axios/getAll";

export const getSongs = async (props: GET_SONGS_QUERY_PROPS) => {
  try {
    const { offset = 0, searchTerm = "eminem" } = props;

    let query = "";

    if (offset) {
      query += `offset=${offset}&`;
    }

    query += `term=${searchTerm.length ? searchTerm : "eminem"}&`;

    const res: GET_SONGS_RES = await getAll({
      endPoint: `https://itunes.apple.com/search/?${query}limit=25`,
    });

    return res;
  } catch (error: T) {
    throw new Error(error?.message);
  }
};
