import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TabSelectionConfig } from './tab-selection-config';

@Component({
  selector: 'app-tab-selection',
  templateUrl: './tab-selection.component.html',
  styleUrls: ['./tab-selection.component.scss']
})
export class TabSelectionComponent implements OnInit, OnChanges {

  @Input()
  config: TabSelectionConfig[] = [];

  @Output()
  eTabClick: EventEmitter<string> = new EventEmitter<string>();

  selectedTab: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.config && this.config.length) {
      this.selectedTab = this.config[0].code;
    }
  }

  tabItemClickHandler(selectedTab: string) {
    this.selectedTab = selectedTab;
    this.eTabClick.emit(selectedTab);
  }

}
