import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService, PermissionsList } from 'src/app/auth.service';

export interface PeopleDetailApiResponse {
  achievements: string[],
  details: {
    areaOfInterest: string,
    bTech: string,
    dateOfJoining: string,
    designation: string,
    email: string,
    facebook: string,
    id: number,
    linkedIN: string,
    mTech: string,
    name: string,
    phd: string,
    phone: string,
    photo: string
  },
  projects: Array<{
    role: string,
    project: string
  }>,
  publications: string[]
}

export class PeopleDetailModel {
  id: number = null as any;
  name: string = null as any;
  designation: string = null as any;
  dateOfJoining: string = null as any;
  photo: string = null as any;
  email: string = null as any;
  phone: string = null as any;
  facebook: string = null as any;
  linkedIN: string = null as any;
  phd: string = null as any;
  mTech: string = null as any;
  bTech: string = null as any;
  achievementInfo: string[] = [];
  projectInfo: Array<{
    role: string,
    projects: string[]
  }> = [];
  publicationInfo: string[] = [];
  areaOfInterestInfo: string[] = [];

  convertToLocal(apiResponse: PeopleDetailApiResponse): PeopleDetailModel {
    this.id = apiResponse.details.id;
    this.name = apiResponse.details.name;
    this.designation = apiResponse.details.designation;
    this.dateOfJoining = apiResponse.details.dateOfJoining;
    this.photo = apiResponse.details.photo ? apiResponse.details.photo : 'assets/user-new-image.png';
    this.email = apiResponse.details.email;
    this.phone = apiResponse.details.phone;
    this.facebook = apiResponse.details.facebook;
    this.linkedIN = apiResponse.details.linkedIN;
    this.phd = apiResponse.details.phd ? 'Ph.D, ' + apiResponse.details.phd : '';
    this.mTech = apiResponse.details.mTech ? 'M.Tech, ' +  apiResponse.details.mTech : '';
    this.bTech = apiResponse.details.bTech ? 'B.Tech, ' +  apiResponse.details.bTech : '';
    this.achievementInfo = apiResponse.achievements;
    this.projectInfo = apiResponse.projects && apiResponse.projects.length ? this.getProjectInfo(apiResponse.projects) : [];
    this.publicationInfo = apiResponse.publications;
    this.areaOfInterestInfo = apiResponse.details.areaOfInterest.split(",");
    return this;
  }

  getProjectInfo(projectResponse: Array<{ role: string, project: string }>): Array<{ role: string, projects: string[] }> {
    const projectInfoRoleWise: { [key: string]: string[] } = {};
    projectResponse.forEach((project: { role: string, project: string }) => {
      if (projectInfoRoleWise[project.role]) {
        projectInfoRoleWise[project.role].push(project.project);
      } else {
        projectInfoRoleWise[project.role] = [project.project];
      }
    });

    const projectInfo: Array<{ role: string, projects: string[] }> = [];
    for (let role in projectInfoRoleWise) {
      projectInfo.push({
        role: role,
        projects: projectInfoRoleWise[role]
      });
    }
    return projectInfo;
  }
}

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss']
})
export class PeopleDetailComponent implements OnInit {

  private peopleDetailApiResponse: PeopleDetailApiResponse = null as any;

  openInEditMode: boolean = false;

  peopleDetail: PeopleDetailModel = null as any;

  peopleFormDetails: any = null as any;

  queryParamDesignation: string = null as any;

  permissionList = PermissionsList;

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private elementRef: ElementRef,
    private route: Router,
    private authService: AuthService
  ) {
  }

  isPermissionAvailable(permission: any) {
    return this.authService.isPermissionAvailable(permission);
  }

  ngOnInit(): void {
    const peopleId: number = this.activeRoute.snapshot.paramMap.get('id') as any;
    this.queryParamDesignation = this.activeRoute.snapshot.queryParamMap.get('designation') as any;
    this.peopleGetById(peopleId);
  }

  peopleGetById(peopleId: number) {
    if (peopleId) {
      this.apiService.getById('deatailteacher', peopleId).subscribe((response: PeopleDetailApiResponse[]) => {
        this.peopleDetailApiResponse = Object.assign({}, response[0]);
        this.peopleDetail = new PeopleDetailModel().convertToLocal(response[0]);
      })
    } else {
      this.peopleEditClickHandler();
    }
  }

  peopleEditClickHandler() {
    this.resetPeopleForm();
    this.openInEditMode = true;
  }

  peopleDeleteClickHandler() {
    const deletePayload: any = {
      id: this.peopleDetail.id,
      isDeleted: true
    };
    this.apiService.delete('people', deletePayload).subscribe((response) => {
      if (response && response.status) {
        this.route.navigate(['main', 'people']);
      } else {
        alert("Something went wrong while deleting people's data.");
      }
    });
  }

  getEmptyPeopleDetails(): PeopleDetailApiResponse {
    return {
      details: {
        id: null as any,
        areaOfInterest: null as any,
        bTech: null as any,
        dateOfJoining: null as any,
        designation: this.queryParamDesignation,
        email: null as any,
        facebook: null as any,
        linkedIN: null as any,
        mTech: null as any,
        name: null as any,
        phd: null as any,
        phone: null as any,
        photo: null as any
      },
      achievements: [],
      publications: [],
      projects: []
    }
  }

  resetPeopleForm() {
    const peopleDetailsData: PeopleDetailApiResponse = this.peopleDetailApiResponse ? this.peopleDetailApiResponse : this.getEmptyPeopleDetails();
    if (peopleDetailsData) {
      const peopleDetailFormValue: any = {};
      peopleDetailFormValue['details'] = Object.assign({}, peopleDetailsData.details);
      peopleDetailFormValue['details'].phone = parseInt(peopleDetailFormValue['details'].phone);
      peopleDetailFormValue['details'].dateOfJoining = new Date(Date.parse(peopleDetailFormValue['details'].dateOfJoining));
      peopleDetailFormValue['achievements'] = peopleDetailsData.achievements.map((value: string) => {
        return { description: value };
      });
      peopleDetailFormValue['publications'] = peopleDetailsData.publications.map((value: string) => {
        return { description: value };
      });
      peopleDetailFormValue['projects'] = Object.assign([], peopleDetailsData.projects);
      this.peopleFormDetails = Object.assign({}, peopleDetailFormValue);
    }
  }

  naviageToSocialMediaAccount(socialMedialUrl: string) {
    window.open(socialMedialUrl);
  }

  addProjectClickHandler() {
    this.peopleFormDetails['projects'].push({
      role: '',
      project: ''
    });
  }

  removeProjectClickHandler(index: number) {
    this.peopleFormDetails['projects'].splice(index, 1);
  }

  addPublicationClickHandler() {
    this.peopleFormDetails['publications'].push({
      description: ''
    });
  }

  removePublicationClickHandler(index: number) {
    this.peopleFormDetails['publications'].splice(index, 1);
  }

  addAchievementClickHandler() {
    this.peopleFormDetails['achievements'].push({
      description: ''
    });
  }

  removeAchievementClickHandler(index: number) {
    this.peopleFormDetails['achievements'].splice(index, 1);
  }

  saveClickHandler() {
    const allFormControl = this.elementRef.nativeElement.querySelectorAll('invalid-control');
    if (allFormControl && allFormControl.length) {
      allFormControl.forEach((control: any) => {
        control.classList.remove('invalid-control');
      });
    }

    const invalidControls = this.elementRef.nativeElement.querySelectorAll('ng-invalid');
    if (invalidControls && invalidControls.length) {
      const firstInvalidControl = invalidControls[0];
      firstInvalidControl.classList.add('invalid-control');
      firstInvalidControl.focus();
    } else {
      const requestPayload: any = Object.assign({}, this.peopleFormDetails);
      const achievements: any = requestPayload['achievements'].map((value: any) => {
        return value.description;
      });
      const publications: any = requestPayload['publications'].map((value: any) => {
        return value.description;
      });
      requestPayload['achievements'] = achievements;
      requestPayload['publications'] = publications;
      this.apiService.post('people', requestPayload).subscribe((response: any) => {
        if (response && response.status) {

        } else {
          alert("Something went wrong while saving people's data.");
        }
      });
    }
  }

}
