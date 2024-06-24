// types.ts
export type MessageProps = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  status: "PENDING" | "SENT" | "DELIVERED" | "READ" | "UNREAD";
};

export type ChatProps = {
  id: string;
  name: string;
  avatar: string; // Caminho para o arquivo de imagem
  messages: MessageProps[];
  unread: number;
};
