import { Component, OnInit } from '@angular/core';
import { TabSelectionConfig } from '../tab-selection/tab-selection-config';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {

  tabSelectionConfig: TabSelectionConfig[] = [
    {
      name: 'General Facilities',
      code: 'GENERAL_FACILITIES'
    },
    {
      name: 'Lab Facilities',
      code: 'LAB_FACILITIES'
    },
    // {
    //   name: 'Facilities Management - For internal use only',
    //   code: 'FACILITIES_MANAGEMENT'
    // }
  ];

  selectedTab: string = 'GENERAL_FACILITIES';

  constructor() { }

  ngOnInit(): void {
  }

  tabClickHandler(selectedTab: string) {
    this.selectedTab = selectedTab;
  }

}
