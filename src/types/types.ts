// types.ts
export type MessageProps = {
  id: number;
  text: string;
  isUser: number;
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
