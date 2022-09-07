import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessagesService } from './services/messages.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { MessagesStorageService } from './services/messages-storage.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AppComponent, MessagesComponent, ChatComponent],
  bootstrap: [AppComponent],
  providers: [MessagesService, MessagesStorageService],
})
export class AppModule {}
