import axios from "axios";
import { Suggestion } from "../../components/common/Sidebar/BugReport/BugReportModal";
import { SLACK_SUGGESTION_ENDPOINT } from "../../utils/contants/endpoints";

const postSuggestion = async ({ email, title, content }: Suggestion) => {
  const messageBody = JSON.stringify({
    attachments: [
      {
        pretext: `${email ?? "익명의 유저"} 님으로부터 새로운 건의사항 도착`,
        color: "#40368a",
        fields: [
          {
            title: `제목 : ${title}`,
            value: `내용 : ${content}`,
            short: true,
          },
        ],
      },
    ],
  });
  await axios.post(SLACK_SUGGESTION_ENDPOINT, messageBody, {
    transformRequest(data, headers) {
      delete headers!.common["Content-Type"];
      return data;
    },
  });
};

export default postSuggestion;
