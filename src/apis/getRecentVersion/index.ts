import axios from "axios";
import { VERSION_CHECK_ENDPOINT } from "../../utils/contants/endpoints";

const getRecentVersion = async () => {
  const { data } = await axios.get(VERSION_CHECK_ENDPOINT);
  return data;
};

export default getRecentVersion;
