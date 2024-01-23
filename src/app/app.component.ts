import { Component } from '@angular/core';

  // export const serverRoute = 'https://kenko-server-9szw.onrender.com'; 

  export const serverRoute = 'http://localhost:4000'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'kenko_front';
}
