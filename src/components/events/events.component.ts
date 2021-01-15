import { Component, OnInit } from '@angular/core';
import { TabSelectionConfig } from '../tab-selection/tab-selection-config';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  tabSelectionConfig: TabSelectionConfig[] = [
    {
      name: 'Workshops',
      code: 'WORKSHOPS'
    },
    // {
    //   name: 'Conferences',
    //   code: 'CONFERENCES'
    // },
    // {
    //   name: 'News',
    //   code: 'NEWS'
    // }
  ];

  selectedTab: string = 'WORKSHOPS';
  
  constructor() { }

  ngOnInit(): void {
  }

  tabClickHandler(selectedTab: string) {
    this.selectedTab = selectedTab;
  }

}
