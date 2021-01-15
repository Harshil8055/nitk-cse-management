import { Component, OnInit } from '@angular/core';
import { TabSelectionConfig } from '../tab-selection/tab-selection-config';

export enum SecurityRightsEntityType {
  USER = 'users',
  ROLE = 'roles'
}

@Component({
  selector: 'app-security-rights',
  templateUrl: './security-rights.component.html',
  styleUrls: ['./security-rights.component.scss']
})
export class SecurityRightsComponent implements OnInit {

  tabSelectionConfig: TabSelectionConfig[] = [
    {
      name: 'User',
      code: SecurityRightsEntityType.USER
    },
    {
      name: 'Role',
      code: SecurityRightsEntityType.ROLE
    }
  ];

  selectedTab: string = SecurityRightsEntityType.USER;

  constructor() { }

  ngOnInit(): void {
  }

  tabClickHandler(selectedTab: string) {
    this.selectedTab = selectedTab;
  }

}
