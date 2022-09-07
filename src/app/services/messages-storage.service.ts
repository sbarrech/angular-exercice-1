import { Injectable } from '@angular/core';
import { Message, MessageSender } from '../models/messages.model';

@Injectable()
export class MessagesStorageService {
  constructor() {}

  public saveMessages(data: { sender: MessageSender; messages: Message[] }[]) {
    localStorage.setItem('messages', JSON.stringify(data));
  }

  public loadMessages(): { sender: MessageSender; messages: Message[] }[] {
    const data = localStorage.getItem('messages');
    if (data == null || data === '') {
      throw new Error('Empty storage');
    }
    return JSON.parse(data);
  }
}
