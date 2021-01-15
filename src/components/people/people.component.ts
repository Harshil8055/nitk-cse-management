import { Component, OnInit } from '@angular/core';
import { TabSelectionConfig } from '../tab-selection/tab-selection-config';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  tabSelectionConfig: TabSelectionConfig[] = [
    {
      name: 'Faculty',
      code: 'FACULTY'
    },
    {
      name: 'Adjunt Faculty',
      code: 'ADJUNT_FACULTY'
    },
    {
      name: 'Adhoc Faculty',
      code: 'ADHOC_FACULTY'
    },
    {
      name: 'Staff',
      code: 'STAFF'
    },
    {
      name: 'Project Staff',
      code: 'PROJECT_STAFF'
    },
    {
      name: 'Research Scholars',
      code: 'RESEARCH_SCHOLARS'
    }
  ];

  selectedTab: string = 'FACULTY';
  
  constructor(
  ) { }

  ngOnInit(): void {
  }

  tabClickHandler(selectedTab: string) {
    this.selectedTab = selectedTab;
  }

}
