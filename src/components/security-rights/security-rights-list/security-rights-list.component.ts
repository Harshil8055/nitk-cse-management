import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { SecurityRightsEntityType } from '../security-rights.component';

export class SecurityRightDetailsApiModel {
  permission_id: number = null as any;
  permission_name: string = null as any;
  screen_id: number = null as any;
  screen_name: string = null as any;
  value: boolean = true;
}

export class SecurityRightEntityTypeModel {
  id: number = null as any;
  name: string = null as any;
}

export class SecurityRightDetailsModel {
  screen: SecurityRightScreenModel[] = [];
}

export class SecurityRightScreenModel {
  id: number = null as any;
  name: string = null as any;
  permission: SecurityRightPermissionModel[] = [];
}

export class SecurityRightPermissionModel {
  id: number = null as any;
  name: string = null as any;
  value: boolean = false;
}

export class SecurityRightDetailsPostModel {
  userId: number = null as any;
  roleId: number = null as any;
  screen: SecurityRightScreenModel[] = [];
}

@Component({
  selector: 'app-security-rights-list',
  templateUrl: './security-rights-list.component.html',
  styleUrls: ['./security-rights-list.component.scss']
})
export class SecurityRightsListComponent implements OnInit, OnChanges {

  @Input()
  rightsEntityType: string = null as any;

  selectedEntity: SecurityRightEntityTypeModel = null as any;

  securityRightDetails: SecurityRightDetailsModel = null as any;

  securityRightEntitys: SecurityRightEntityTypeModel[] = [];

  changedRights: SecurityRightDetailsPostModel = null as any;

  initialSecurityRights: SecurityRightDetailsApiModel[] = null as any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('rightsEntityType' in changes) {
      this.getEntityList();
    }
  }

  getEntityList() {
    this.apiService.get(this.rightsEntityType).subscribe((response: SecurityRightEntityTypeModel[]) => {
      if (response && response.length) {
        this.securityRightEntitys = response;
        this.selectedEntity = Object.assign({}, response[0]);
        this.getEntityDetails();
      }
    });
  }

  getEntityDetails() {
    this.apiService.get('securityrights', this.getQueryParams()).subscribe((response: SecurityRightDetailsApiModel[]) => {
      if (response && response.length) {
        this.initialSecurityRights = response;
        this.securityRightDetails = this.convertSecurityRightApiModelToDetailModel(response);
      }
    });
  }

  getQueryParams(): any {
    const id: number = this.selectedEntity && this.selectedEntity.id;
    switch (this.rightsEntityType) {
      case SecurityRightsEntityType.USER:
        return { user_id: id };
      case SecurityRightsEntityType.ROLE:
        return { role_id: id };
    }
  }

  convertSecurityRightApiModelToDetailModel(apiResponse: SecurityRightDetailsApiModel[]): SecurityRightDetailsModel {
    if (apiResponse && apiResponse.length) {
      const securityRightDetailsModel: SecurityRightDetailsModel = new SecurityRightDetailsModel();
      const screenWiseResponse: { [key: string]: SecurityRightScreenModel } = {};
      apiResponse.forEach((response: SecurityRightDetailsApiModel) => {
        const screenName: string = response && response.screen_name;
        if (screenName && screenWiseResponse[screenName]) {
          screenWiseResponse[screenName].permission.push({
            id: response.permission_id,
            name: response.permission_name,
            value: response.value
          });
        } else {
          screenWiseResponse[screenName] = {
            id: response.screen_id,
            name: response.screen_name,
            permission: [{
              id: response.permission_id,
              name: response.permission_name,
              value: response.value
            }]
          }
        }
      });

      for (let screenName in screenWiseResponse) {
        securityRightDetailsModel.screen.push(screenWiseResponse[screenName]);
      }

      return securityRightDetailsModel;
    } else {
      return null as any;
    }
  }

  entityNameClickHandler(entity: SecurityRightEntityTypeModel) {
    this.selectedEntity = Object.assign({}, entity);
    this.getEntityDetails();
  }

  isSelectedEntity(entity: SecurityRightEntityTypeModel) {
    return entity && this.selectedEntity && entity.id === this.selectedEntity.id;
  }

  permissionChangeHandler(permission: SecurityRightPermissionModel, screen: SecurityRightScreenModel) {
    permission.value = !permission.value;
    if (!this.changedRights) {
      this.changedRights = new SecurityRightDetailsPostModel();
    }

    if (this.rightsEntityType === SecurityRightsEntityType.USER) {
      this.changedRights.userId = this.selectedEntity.id;
    } else if (this.rightsEntityType === SecurityRightsEntityType.ROLE) {
      this.changedRights.roleId = this.selectedEntity.id;
    }

    const matchedScreen: SecurityRightScreenModel | undefined = this.changedRights.screen.find((value: SecurityRightScreenModel) => {
      return screen && value && screen.id === value.id;
    });

    if (matchedScreen) {
      const matchedPermission: SecurityRightPermissionModel | undefined = matchedScreen.permission.find((value: SecurityRightPermissionModel) => {
        return permission && value && permission.id === value.id;
      });
      if (matchedPermission) {
        matchedPermission.value = permission.value;
      } else {
        matchedScreen.permission.push(Object.assign({}, permission));
      }
    } else {
      const newAddedScreen: SecurityRightScreenModel = Object.assign({}, screen);
      newAddedScreen.permission = [Object.assign({}, permission)];
      this.changedRights.screen.push(newAddedScreen);
    }
  }

  securityRightSaveClickHandler() {
    this.getFinalChangedRights();
    this.apiService.post('updatepermission', this.changedRights).subscribe((response: any) => {
      if (response && response.status) {
        this.getEntityDetails();
      } else {
        alert("Something went wront while saving security right's data.")
      }
    });
  }

  getFinalChangedRights() {
    if (this.changedRights && this.changedRights.screen && this.changedRights.screen.length) {
      const updatedScreenPermissions: SecurityRightScreenModel[] = [];
      this.changedRights.screen.forEach((screen: SecurityRightScreenModel) => {
        const updatedPermissions: SecurityRightPermissionModel[] = [];
        if (screen && screen.permission && screen.permission.length) {
          screen.permission.forEach((permission: SecurityRightPermissionModel) => {
            const matchedPermission: any = this.initialSecurityRights.find((initialPermission: SecurityRightDetailsApiModel) => {
              return initialPermission && permission && initialPermission.permission_id === permission.id 
                && initialPermission.screen_id === screen.id
                && initialPermission.value !== permission.value;
            });
            
            if (matchedPermission) {
              updatedPermissions.push(permission);
            }
          });
        }

        if (updatedPermissions && updatedPermissions.length) {
          updatedScreenPermissions.push(screen);
        }
      });
      this.changedRights.screen = updatedScreenPermissions;
    }
  }

}
