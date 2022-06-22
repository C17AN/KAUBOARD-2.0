import axios from "axios";
import { BACKEND_ENDPOINT } from "../../utils/contants/endpoints";

const getWeather = async () => {
  const path = `${BACKEND_ENDPOINT}/weather`;
  const { data } = await axios.get(path);
  return data;
};

export default getWeather;
