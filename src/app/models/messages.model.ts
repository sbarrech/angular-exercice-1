export interface MessageSender {
  name: string;
  profileImage: string;
}

export interface Message {
  id: string;
  sender: MessageSender;
  content: string;
  read: boolean;
  date: Date;
}
