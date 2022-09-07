import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Message, MessageSender } from 'src/app/models/messages.model';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  items: { sender: MessageSender; messages: Message[] }[];
  private destroy$: Subject<boolean> = new Subject();

  constructor(
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.messagesService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.items = data));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onContactSelection(sender: MessageSender, messages: Message[]) {
    this.router.navigateByUrl('/chat', {
      state: { sender },
    });
  }
}
