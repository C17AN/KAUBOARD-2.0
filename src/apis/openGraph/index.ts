import axios from "axios";
import { OPENGRAPH_ENDPOINT } from "../../utils/contants/endpoints";

// react-query에서 fetcher에 파라미터를 전달하는 방식임
// Ref. https://stackoverflow.com/questions/68105012/what-is-the-correct-way-to-pass-parameters-to-a-react-query-usequery-method-that

const openGraphFetcher = ({ queryKey }) => {
  const [_, siteUrl] = queryKey;
  return axios.get(OPENGRAPH_ENDPOINT, {
    params: {
      siteUrl,
    },
  });
};

export default openGraphFetcher;
