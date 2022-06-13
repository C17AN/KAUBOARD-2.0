import { limitToLast, onValue, orderByChild, push, query, ref, remove } from "firebase/database";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { realtimeDbService } from "../../firebase/Config";
import MessageType from "../../types/Message";

// TODO: AWS Lambda or Cloud Functions와 연동한 Cronjob 형태로 재작성하기
// 현재는 불필요하게 API 호출이 낭비될 우려가 있음
export const deleteMessage = async () => {
  const chattingListRef = query(ref(realtimeDbService, "chatting"), orderByChild("createdAt"));
  onValue(chattingListRef, (res) => {
    const chattingRefList = Object.entries(res.val());
    chattingRefList.forEach((chattingRef) => {
      const [key, message] = chattingRef as [key: string, message: MessageType];
      if (new Date(message.createdAt!).getTime() + 1000 * 60 * 60 * 24 < new Date().getTime()) {
        remove(ref(realtimeDbService, `chatting/${key}`));
      }
    });
  });
};

export const listenMessageUpdate = (
  updateMessageList: Dispatch<SetStateAction<MessageType[] | null>>
) => {
  const chatRef = query(
    ref(realtimeDbService, `chatting`),
    orderByChild("createdAt"),
    limitToLast(100)
  );
  onValue(chatRef, (res) => {
    const _messageList = Object.values(res.val()) as MessageType[];
    updateMessageList(_messageList);
  });
};

export const postMessage = (message: Omit<MessageType, "createdAt" | "uid">) => {
  const location = ref(realtimeDbService, `chatting`);
  const { senderName, senderEmail, content } = message;

  if (content && content.length > 0) {
    push(location, {
      uid: uuidv4(),
      senderName,
      senderEmail,
      content,
      createdAt: new Date().getTime(),
    });
  }
};
