import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessagesService } from './services/messages.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, MessagesComponent],
  bootstrap: [AppComponent],
  providers: [MessagesService],
})
export class AppModule {}
