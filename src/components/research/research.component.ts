import { Component, OnInit } from '@angular/core';
import { TabSelectionConfig } from '../tab-selection/tab-selection-config';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {
  tabSelectionConfig: TabSelectionConfig[] = [
    {
      name: 'R & D Projects',
      code: 'R&D_PROJECTS'
    },
    // {
    //   name: 'Consultancy',
    //   code: 'CONSULTANCY'
    // },
    // {
    //   name: 'MoU',
    //   code: 'MOU'
    // }
  ];

  selectedTab: string = 'R&D_PROJECTS';

  constructor() { }

  ngOnInit(): void {
  }

  tabClickHandler(selectedTab: string) {
    this.selectedTab = selectedTab;
  }

}
