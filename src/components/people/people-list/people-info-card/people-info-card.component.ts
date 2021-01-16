import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, PermissionsList } from 'src/app/auth.service';
import { PeopleListModel } from '../people-list.component';

@Component({
  selector: 'app-people-info-card',
  templateUrl: './people-info-card.component.html',
  styleUrls: ['./people-info-card.component.scss']
})
export class PeopleInfoCardComponent implements OnInit {

  @Input()
  peopleDetail: PeopleListModel = null as any;

  permissionList = PermissionsList;

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  isPermissionAvailable(permission: any) {
    return this.authService.isPermissionAvailable(permission);
  }

  cardClickHandler() {
    if (this.isPermissionAvailable(PermissionsList.PEOPLEVIEW) && this.peopleDetail && this.peopleDetail.id) {
      this.route.navigate(['main', 'people-detail', 'edit', this.peopleDetail.id]);
    }
  }

}
