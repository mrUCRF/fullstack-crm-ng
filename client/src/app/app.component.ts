import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {

  }
  ngOnInit(): void {
    const potencialToken = localStorage.getItem('auth-token')
    if(potencialToken !== null) {
      this.auth.setToken(potencialToken)
    }
  }
}
