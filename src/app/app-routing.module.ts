import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ChatComponent } from './components/chat/chat.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  { path: 'messages', component: MessagesComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
