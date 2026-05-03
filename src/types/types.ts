// types.ts
export type MessageProps = {
  id: number;
  contact_id: number;
  text: string;
  is_user: number;
  timestamp: string;
  status: "PENDING" | "SENT" | "DELIVERED" | "READ" | "UNREAD";
};

export type ChatProps = {
  id: number;
  name: string;
  avatar: string; // Caminho para o arquivo de imagem
  messages: MessageProps[];
  unread: number;
};
