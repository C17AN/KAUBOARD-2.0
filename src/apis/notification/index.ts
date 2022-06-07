import axios from "axios";
import { BACKEND_ENDPOINT } from "../../utils/contants/endpoints";

const getNotification = () => {
  const endPoint = `${BACKEND_ENDPOINT}/notification`;
  return axios.get(endPoint);
};

export default getNotification;
