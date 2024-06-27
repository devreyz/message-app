const CHATS = [
  {
    id: "1",
    name: "John Doe",
    avatar: require("@/assets/images/user.png"),

    messages: [
      {
        id: "1",
        text: "Oii",
        isUser: false, // Se for uma mensagem recebida de outro usuario marcar como false se for enviada marcar true
        timestamp: "2022-01-01T12:00:00.000Z",
        status: "PENDING", // PENDING || SENT || DELIVERED || READ
      },
      {
        id: "2",
        text: "Oii, td bem?",
        isUser: true,
        timestamp: "2022-01-01T12:00:00.000Z",
        status: "PENDING", // PENDING || SENT || DELIVERED || READ
      },
      {
        id: "3",
        text: "Sim",
        isUser: false,
        timestamp: "2022-01-01T12:00:00.000Z",
        status: "PENDING", // PENDING || SENT || DELIVERED || READ
      },
      {
        id: "4",
        text: "E vc?",
        isUser: false,
        timestamp: "2022-01-01T12:00:00.000Z",
        status: "PENDING", // PENDING || SENT || DELIVERED || READ
      },
    ],

    unread: 23,
  },
  {
    id: "2",
    name: "Teste",
    avatar: require("@/assets/images/user.png"),

    messages: [
      {
        id: "1",
        text: "Oii",
        isUser: false,
        timestamp: "2022-01-01T12:00:00.000Z",
        status: "READ",
      },
      {
        id: "2",
        text: "Oii, td bem?",
        isUser: true,
        timestamp: "2022-01-01T12:01:00.000Z",
        status: "READ",
      },
      {
        id: "3",
        text: "Sim",
        isUser: false,
        timestamp: "2022-01-01T12:02:00.000Z",
        status: "READ",
      },
      {
        id: "4",
        text: "E vc?",
        isUser: false,
        timestamp: "2022-01-01T12:03:00.000Z",
        status: "READ",
      },
      {
        id: "5",
        text: "Estou bem, obrigado!",
        isUser: true,
        timestamp: "2022-01-01T12:04:00.000Z",
        status: "READ",
      },
      {
        id: "6",
        text: "O que você tem feito?",
        isUser: true,
        timestamp: "2022-01-01T12:05:00.000Z",
        status: "READ",
      },
      {
        id: "7",
        text: "Nada de especial, apenas trabalhando.",
        isUser: false,
        timestamp: "2022-01-01T12:06:00.000Z",
        status: "READ",
      },
      {
        id: "8",
        text: "Entendo.",
        isUser: true,
        timestamp: "2022-01-01T12:07:00.000Z",
        status: "READ",
      },
      {
        id: "9",
        text: "E você?",
        isUser: false,
        timestamp: "2022-01-01T12:08:00.000Z",
        status: "READ",
      },
      {
        id: "10",
        text: "Também estou trabalhando muito. sjdhdrjdkdox djd dje djd cne r  rnr rnr rne rnd c cjc dnc cjd  mc  kc ck  cnd ckr  mr vmd cndkd  ncnfkc djc cnc xnc  c f r r f dn, c c c c c cnd dnc 8",
        isUser: true,
        timestamp: "2022-01-01T12:09:00.000Z",
        status: "READ",
      },
      {
        id: "11",
        text: "Que bom.",
        isUser: false,
        timestamp: "2022-01-01T12:10:00.000Z",
        status: "READ",
      },
      {
        id: "12",
        text: "Você tem planos para o fim de semana?",
        isUser: true,
        timestamp: "2022-01-01T12:11:00.000Z",
        status: "READ",
      },
      {
        id: "13",
        text: "Ainda não.",
        isUser: false,
        timestamp: "2022-01-01T12:12:00.000Z",
        status: "READ",
      },
      {
        id: "14",
        text: "Vamos sair?",
        isUser: true,
        timestamp: "2022-01-01T12:13:00.000Z",
        status: "READ",
      },
      {
        id: "15",
        text: "Claro, ótima ideia!",
        isUser: false,
        timestamp: "2022-01-01T12:14:00.000Z",
        status: "READ",
      },
      {
        id: "16",
        text: "Onde você quer ir?",
        isUser: true,
        timestamp: "2022-01-01T12:15:00.000Z",
        status: "READ",
      },
      {
        id: "17",
        text: "Que tal um cinema?",
        isUser: false,
        timestamp: "2022-01-01T12:16:00.000Z",
        status: "READ",
      },
      {
        id: "18",
        text: "Perfeito!",
        isUser: true,
        timestamp: "2022-01-01T12:17:00.000Z",
        status: "READ",
      },
      {
        id: "19",
        text: "Qual filme?",
        isUser: false,
        timestamp: "2022-01-01T12:18:00.000Z",
        status: "READ",
      },
      {
        id: "20",
        text: "Vamos ver aquele novo lançamento.",
        isUser: true,
        timestamp: "2022-01-01T12:19:00.000Z",
        status: "READ",
      },
      {
        id: "21",
        text: "Boa escolha.",
        isUser: false,
        timestamp: "2022-01-01T12:20:00.000Z",
        status: "READ",
      },
      {
        id: "22",
        text: "Então combinado.",
        isUser: true,
        timestamp: "2022-01-01T12:21:00.000Z",
        status: "READ",
      },
      {
        id: "23",
        text: "Sim.",
        isUser: false,
        timestamp: "2022-01-01T12:22:00.000Z",
        status: "READ",
      },
      {
        id: "24",
        text: "Até lá!",
        isUser: true,
        timestamp: "2022-01-01T12:23:00.000Z",
        status: "READ",
      },
      {
        id: "25",
        text: "Até!",
        isUser: false,
        timestamp: "2022-01-01T12:24:00.000Z",
        status: "READ",
      },
      {
        id: "26",
        text: "Nos vemos amanhã.",
        isUser: true,
        timestamp: "2022-01-01T12:25:00.000Z",
        status: "DELIVERED",
      },
      {
        id: "27",
        text: "Nos vemos.",
        isUser: false,
        timestamp: "2022-01-01T12:26:00.000Z",
        status: "READ",
      },
      {
        id: "28",
        text: "Até mais.",
        isUser: true,
        timestamp: "2022-01-01T12:27:00.000Z",
        status: "PENDING",
      },
      {
        id: "29",
        text: "Até logo.",
        isUser: false,
        timestamp: "2022-01-01T12:28:00.000Z",
        status: "UNREAD",
      },
      {
        id: "30",
        text: "Tchau.",
        isUser: true,
        timestamp: "2022-01-01T12:29:00.000Z",
        status: "SENT",
      },
    ],
    unread: 23,
  },
  {
    id: "3",
    name: "Fulano",
    avatar: require("@/assets/images/user.png"),

    messages: [
      {
        id: "1",
        text: "Oii",
        isUser: false, // Se for uma mensagem recebida de outro usuario marcar como false se for enviada marcar true
        timestamp: "2022-01-01T12:00:00.000Z",
        status: "PENDING", // PENDING || SENT || DELIVERED || READ
      },
      {
        id: "2",
        text: "Oii, td bem?",
        isUser: true,
        timestamp: "2022-01-01T12:00:00.000Z",
        status: "PENDING", // PENDING || SENT || DELIVERED || READ
      },
      {
        id: "3",
        text: "Sim",
        isUser: false,
        timestamp: "2022-01-01T12:00:00.000Z",
        status: "PENDING", // PENDING || SENT || DELIVERED || READ
      },
      {
        id: "4",
        text: "E vc?",
        isUser: false,
        timestamp: "2022-01-01T12:00:00.000Z",
        status: "PENDING", // PENDING || SENT || DELIVERED || READ
      },
    ],

    unread: 23,
  },
];
type ChatProps = (typeof CHATS)[0];

const getChat = (id: string | string[] | undefined) => {
  console.log("Buscou mensagens do chat de ID: " + id);
  return CHATS.filter((item) => item.id === id)[0];
};

export { CHATS, ChatProps, getChat };
