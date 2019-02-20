import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { AuthService } from "../shared/services/auth/auth.service";
import { Router } from "@angular/router";
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  @ViewChild('sidenav') sidenav: MatSidenav;

  close() {
    this.sidenav.close();
  }

  ngOnInit() { }
}
