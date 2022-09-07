import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, defer, of, Subject } from 'rxjs';
import {
  catchError,
  filter,
  map,
  tap,
  shareReplay,
  takeUntil,
} from 'rxjs/operators';
import { Message, MessageSender } from '../models/messages.model';
import { MessagesStorageService } from './messages-storage.service';

@Injectable()
export class MessagesService implements OnDestroy {
  private url =
    'https://raw.githubusercontent.com/NablaT/test-api/master/assets/messages.json.txt';

  private _messages = new BehaviorSubject<
    { sender: MessageSender; messages: Message[] }[]
  >(undefined);
  public messages$ = this._messages.asObservable();
  private destroy$: Subject<boolean> = new Subject();

  constructor(
    private httpClient: HttpClient,
    private messagesStorageService: MessagesStorageService
  ) {
    defer(() => of(messagesStorageService.loadMessages()))
      .pipe(
        takeUntil(this.destroy$),
        catchError(() => this.fetchMessages()),
        map((messages) => this._messages.next(messages))
      )
      .subscribe();

    this.messages$
      .pipe(
        takeUntil(this.destroy$),
        filter((data) => data != undefined)
      )
      .subscribe(messagesStorageService.saveMessages);
  }

  private fetchMessages() {
    return this.httpClient.get<Message[]>(this.url).pipe(
      takeUntil(this.destroy$),
      shareReplay(),
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
    );
  }

  public sendMessages(sender: MessageSender, content: string) {
    const message: Message = {
      id: `${Math.random()}`,
      sender,
      content,
      read: false,
      date: new Date(),
    };
    const messages = this._messages.getValue();
    const senderMessages = messages.find((m) => m.sender.name === sender.name);
    senderMessages.messages.push(message);
    this._messages.next([
      senderMessages,
      ...messages.filter((m) => m.sender.name !== sender.name),
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
