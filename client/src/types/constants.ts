export interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  avatar: string;
  isUser: boolean;
}

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
}
