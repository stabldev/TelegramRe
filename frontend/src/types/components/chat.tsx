export type Chat {
  id: number;
  username: string;
  image: string;
  content: string;
  time: string;
  status: "seen" | "send" | "sending";
}
