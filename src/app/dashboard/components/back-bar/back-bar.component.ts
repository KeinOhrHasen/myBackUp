import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-bar',
  templateUrl: './back-bar.component.html',
  styleUrls: ['./back-bar.component.css']
})
export class BackBarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public router : Router) {  }
    idDashboard: boolean = this.router.url.endsWith('dashboard')
  ngOnInit() {
  }

}
