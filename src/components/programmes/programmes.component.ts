import { Component, OnInit } from '@angular/core';
import { TabSelectionConfig } from '../tab-selection/tab-selection-config';

@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.scss']
})
export class ProgrammesComponent implements OnInit {

  tabSelectionConfig: TabSelectionConfig[] = [
    {
      name: 'Undergraduate',
      code: 'UNDERGRADUATE'
    },
    {
      name: 'Postgraduate',
      code: 'POSTGRADUATE'
    },
    {
      name: 'Doctoral',
      code: 'DOCTORAL'
    },
    
  ];

  selectedTab: string = 'UNDERGRADUATE';
  constructor() { }

  ngOnInit(): void {
  }
  tabClickHandler(selectedTab: string) {
    this.selectedTab = selectedTab;
  }

}
