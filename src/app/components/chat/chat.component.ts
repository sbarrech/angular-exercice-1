import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Message, MessageSender } from '../../models/messages.model';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  sender: MessageSender;
  messages: Message[];
  messageContent: FormControl = new FormControl('');

  private destroy$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private messagesService: MessagesService
  ) {
    if (this.router.getCurrentNavigation().extras.state == null) {
      this.router.navigateByUrl('/messages');
      return;
    }
    const { sender, messages } =
      this.router.getCurrentNavigation().extras.state;
    this.sender = sender;
  }

  ngOnInit() {
    this.messagesService.messages$
      .pipe(
        takeUntil(this.destroy$),
        map(
          (messages) =>
            messages.find((m) => m.sender.name === this.sender.name).messages
        )
      )
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  sendMessage() {
    this.messagesService.sendMessages(this.sender, this.messageContent.value);
    this.messageContent.reset();
  }
}
