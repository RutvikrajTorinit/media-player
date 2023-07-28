import axios from "axios";

interface GET_ALL_REQ_PROPS {
  endPoint: string;
}

const getAll = async (props: GET_ALL_REQ_PROPS) => {
  const { endPoint } = props;

  try {
    const res = await axios.get(endPoint, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "Content-type": "application/json"
      }
    });

    return res.data;
  } catch (error: T) {
    throw new Error(error?.message);
  }
};

export default getAll;
