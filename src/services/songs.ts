import getAll from "./axios/getAll";

export const getSongs = async () => {
  try {
    const res = await getAll({
      endPoint:
        "https://itunes.apple.com/search/?term=tracks&offset=${offset}&limit=50",
    });

    return res?.data;
  } catch (error: T) {
    throw new Error(error?.message);
  }
};
