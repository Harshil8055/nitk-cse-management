import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

export enum MenuBarOptions {
  home = 'home',
  programmes = 'programmes',
  courses = 'courses',
  people = 'people',
  students = 'students',
  facilities = 'facilities',
  research = 'research',
  achivements = 'achivements',
  placements = 'placements',
  events = 'events',
  contact =  'contact',
  securityRights = 'security-rights',
  marks = 'marks'
}

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  menuBarOptions = MenuBarOptions;

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  menuBarItemClickHandler(routingPath: MenuBarOptions) {
    if (routingPath) {
      this.route.navigate(['main', routingPath]);
    } else {
      this.route.navigate(['main']);
    }
  }

  isOptionSelected(menuBarOption: MenuBarOptions) {
    return this.route.url.includes(menuBarOption);
  }

  loginClickHandler() {
    this.route.navigate(['login'])
  }

  logoutClickHandler() {
    this.authService.resetUserDetails();
    this.route.navigate(['main']);
  }

  isUserLogin() {
    return this.authService.isUserLoggedIn();
  }

  isAdminLoggedIn() {
    return this.authService.isAdminLoggedIn();
  }

}
