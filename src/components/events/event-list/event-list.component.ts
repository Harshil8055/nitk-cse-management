import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/api.service';

export class EventDetailModel {
  title: string = null as any;
  description: string = null as any;
  organizer: string = null as any;
  area: string = null as any;
  place: string = null as any;
  status: string = null as any;
  startDate: string = null as any;
  endDate: string = null as any;
  duration: string = null as any;
  isSelected: boolean = false;

  convertToLocal(apiResponse: EventDetailModel) {
    this.title = apiResponse.title;
    this.description = apiResponse.description;
    this.organizer = apiResponse.organizer;
    this.area = apiResponse.area;
    this.place = apiResponse.place;
    this.status = apiResponse.status;
    this.startDate = new Date(apiResponse.startDate).toDateString();
    this.endDate = new Date(apiResponse.endDate).toDateString();
    this.duration = apiResponse.duration;
    return this;
  }
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input()
  apiSubPath: string = '';

  initialEventList: EventDetailModel[] = [];

  eventList: EventDetailModel[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('apiSubPath' in changes) {
      this.resetEventList();
      this.getPeopleList();
    }
  }

  resetEventList() {
    this.eventList = [];
  }

  getPeopleList() {
    if (this.apiSubPath) {
      this.apiService.get(this.apiSubPath).subscribe((response: EventDetailModel[]) => {
        if (response && response.length) {
          response.forEach((value: EventDetailModel) => {
            this.eventList.push(new EventDetailModel().convertToLocal(value));
            this.initialEventList.push(new EventDetailModel().convertToLocal(value));
          });
        }
      });
    }
  }

  eventClickHandler(eventDetail: EventDetailModel) {
    if (eventDetail) {
      const changedValue: boolean = !eventDetail.isSelected;
      this.eventList.forEach((event: EventDetailModel) => {
        event.isSelected = false;
      });
      eventDetail.isSelected = changedValue;
    }
  }

  statusChangeHandler(event: any) {
    this.initialEventList.forEach((event: EventDetailModel) => {
      event.isSelected = false;
    });
    const changedStatus: string = event && event.target && event.target.value;
    if (changedStatus.toUpperCase() === 'ALL') {
      this.eventList = this.initialEventList.filter((event: EventDetailModel) => {
        return true;
      });
    } else {
      this.eventList = this.initialEventList.filter((event: EventDetailModel) => {
        return event && event.status && event.status.toUpperCase() === changedStatus.toUpperCase();
      });
    }
  }

}
