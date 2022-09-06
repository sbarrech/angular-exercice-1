import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  url =
    'https://raw.githubusercontent.com/NablaT/test-api/master/assets/messages.json.txt';
}
