import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Message, MessageSender } from 'src/app/models/messages.model';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  items: { sender: MessageSender; messages: Message[] }[];
  destroy$: Subject<boolean> = new Subject();

  constructor(private messagesService: MessagesService) {}

  ngOnInit() {
    this.messagesService
      .fetchMessages()
      .pipe(
        takeUntil(this.destroy$),
        map((messages) => {
          const sendersMap = new Map<
            string,
            { sender: MessageSender; messages: Message[] }
          >();
          messages.forEach((m) =>
            sendersMap.set(m.sender.name, {
              sender: m.sender,
              messages: [
                ...(sendersMap.has(m.sender.name)
                  ? sendersMap.get(m.sender.name).messages
                  : []),
                m,
              ],
            })
          );
          return Array.from(sendersMap.values());
        })
      )
      .subscribe((data) => (this.items = data));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
