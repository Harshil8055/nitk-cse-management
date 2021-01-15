import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuBarOptions } from '../menu-bar/menu-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mockDataForNewsAndUpcomingEvents: string[] = [
    'mock data for news and upcoming events, fetch the data of it from back end'
  ]

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToEventsClickHandler() {
    this.route.navigate(['main', MenuBarOptions.events]);
  }

}
