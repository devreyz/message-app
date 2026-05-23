// types.ts
export type MessageProps = {
  id: string;
  text: string;
  /** 1 = sent by current user, 0 = received */
  is_user: number;
  timestamp: string;
  status: "PENDING" | "SENT" | "DELIVERED" | "READ" | "UNREAD";
};
