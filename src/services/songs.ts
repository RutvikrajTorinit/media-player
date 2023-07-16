import getAll from "./axios/getAll";

export const getSongs = async () => {
  try {
    const res = await getAll({
      endPoint:
        "https://itunes.apple.com/search/?term=${term}&offset=${offset}&limit=100",
    });

    return res?.data;
  } catch (error: T) {
    throw new Error(error?.message);
  }
};
