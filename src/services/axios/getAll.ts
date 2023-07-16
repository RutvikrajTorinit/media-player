/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from "axios";

interface GET_ALL_REQ_PROPS {
  endPoint: string;
}

const getAll = async (props: GET_ALL_REQ_PROPS) => {
  const { endPoint } = props;

  try {
    const res = await axios.get(endPoint, {
      headers: {
        "Content-type": "application/json",
      },
    });

    return res;
  } catch (error: T) {
    throw new Error(error?.message);
  }
};

export default getAll;
