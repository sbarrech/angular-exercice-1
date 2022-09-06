import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Message } from '../models/messages.model';

@Injectable()
export class MessagesService {
  url =
    'https://raw.githubusercontent.com/NablaT/test-api/master/assets/messages.json.txt';

  constructor(private httpClient: HttpClient) {}

  public fetchMessages() {
    return this.httpClient.get<Message[]>(this.url);
  }
}
