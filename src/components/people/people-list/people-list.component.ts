import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService, PermissionsList } from 'src/app/auth.service';

export class PeopleListModel {
  id: number = null as any;
  name: string = null as any;
  phone: string = null as any;
  email: string = null as any;
  designation: string = 'none';
  photoSrc: string = 'assets/user-new-image.png';
  supervisor: string = null as any;
  areaOfInterest: string = null as any;
  category: string = null as any;

  convertInLocal(apiResponse: PeopleListModel): PeopleListModel {
    this.id = apiResponse.id;
    this.name = apiResponse.name;
    this.phone = apiResponse.phone;
    this.email = apiResponse.email;
    if (apiResponse.designation) {
      this.designation = apiResponse.designation;
    }
    if (apiResponse.photoSrc) {
      this.photoSrc = apiResponse.photoSrc;
    }
    this.supervisor = apiResponse.supervisor;
    this.areaOfInterest = apiResponse.areaOfInterest;
    this.category = apiResponse.category;
    return this;
  }
}

export class PeopleDetailsWithDesignation {
  designation: string = null as any;
  peopleDetailsList: PeopleListModel[] = [];
}

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit, OnChanges {

  @Input()
  apiSubPath: string = '';

  peopleDetailsWithDesignation: PeopleDetailsWithDesignation[] = [];

  permissionList = PermissionsList;

  constructor(
    private apiService: ApiService,
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('apiSubPath' in changes) {
      this.resetPeopleList();
      this.getPeopleList();
    }
  }

  isPermissionAvailable(permission: any) {
    return this.authService.isPermissionAvailable(permission);
  }

  resetPeopleList() {
    this.peopleDetailsWithDesignation = [];
  }

  getPeopleList() {
    if (this.apiSubPath) {
      this.apiService.get(this.apiSubPath).subscribe((response: PeopleListModel[]) => {
        this.groupPeopleByDesignation(response);
      });
    }
  }

  groupPeopleByDesignation(apiResponse: PeopleListModel[]) {
    const peopleDataWithDesignation: { [key: string]: PeopleListModel[] } = {};
    if (apiResponse && apiResponse.length) {
      apiResponse.forEach((response: PeopleListModel) => {
        response = new PeopleListModel().convertInLocal(response);
        if (peopleDataWithDesignation[response.designation]) {
          peopleDataWithDesignation[response.designation].push(response);
        } else {
          peopleDataWithDesignation[response.designation] = [response];
        }
      });
    }

    for (let peopleData in peopleDataWithDesignation) {
      const peopleDetails: PeopleDetailsWithDesignation = new PeopleDetailsWithDesignation();
      peopleDetails.designation = peopleData;
      peopleDetails.peopleDetailsList = peopleDataWithDesignation[peopleData];
      this.peopleDetailsWithDesignation.push(peopleDetails);
    }
  }

  isNoneDesignation(peopleDetails: PeopleDetailsWithDesignation): boolean {
    return !!(peopleDetails && peopleDetails.designation && peopleDetails.designation.toUpperCase() === 'NONE');
  }

  addPeopleClickHandler(designation: string) {
    this.route.navigate(['main', 'people-detail', 'create'], { queryParams: { designation: designation } });
  }

}
