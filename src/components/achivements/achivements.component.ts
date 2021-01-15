import { Component, OnInit } from '@angular/core';
import { TabSelectionConfig } from '../tab-selection/tab-selection-config';

@Component({
  selector: 'app-achivements',
  templateUrl: './achivements.component.html',
  styleUrls: ['./achivements.component.scss']
})
export class AchivementsComponent implements OnInit {
  
  tabSelectionConfig: TabSelectionConfig[] = [
    {
      name: 'Department',
      code: 'DEPARTMENT'
    },
    {
      name: 'Faculty',
      code: 'FACULTY'
    },
    {
      name: 'Students',
      code: 'STUDENTS'
    },
    {
      name: 'Patents',
      code: 'PATENTS'
    }
  ];

  selectedTab: string = 'DEPARTMENT';

  constructor() { }

  ngOnInit(): void {
  }

  tabClickHandler(selectedTab: string) {
    this.selectedTab = selectedTab;
  }

}
