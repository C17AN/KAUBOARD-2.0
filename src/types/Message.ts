type MessageType = {
  createdAt: number | null;
  content: string | null;
  senderName: string | null;
  senderEmail: string | null;
  uid: string;
  type: "MESSAGE" | "SYSTEM";
};

export default MessageType;
