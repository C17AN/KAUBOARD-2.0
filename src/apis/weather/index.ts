import axios from "axios";
import { BACKEND_ENDPOINT } from "../../utils/contants/endpoints";

const getWeather = async () => {
  try {
    const path = `${BACKEND_ENDPOINT}/weather`;
    const { data } = await axios.get(path);
    return { status: 200, data };
  } catch (err) {
    return { status: 500, data: err };
  }
};

export default getWeather;
