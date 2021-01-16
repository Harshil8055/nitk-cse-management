import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

export enum PermissionsList {
    MARKSVIEW = 'MARKSVIEW',
    MARKSCREATE = 'MARKSCREATE',
    MARKSUPDATE = 'MARKSUPDATE',
    MARKSPARTIALUPDATE = 'MARKSPARTIALUPDATE',
    PEOPLEVIEW = 'PEOPLEVIEW',
    PEOPLECREATE = 'PEOPLECREATE',
    PEOPLEUPDATE = 'PEOPLEUPDATE',
    PEOPLEPARTIALUPDATE = 'PEOPLEPARTIALUPDATE',
    PEOPLEDELETE = 'PEOPLEDELETE',
    STUDENTSVIEW = 'STUDENTSVIEW',
    STUDENTSCREATE = 'STUDENTSCREATE',
    STUDENTSUPDATE = 'STUDENTSUPDATE',
    STUDENTSPARTIALUPDATE = 'STUDENTSPARTIALUPDATE'
}

export class UserDetailModel {
    id: number = null as any;
    name: string = null as any;
    role: string = null as any;
    permissions: PermissionsList[] = [];
}

@Injectable()
export class AuthService {

    get userDetail(): UserDetailModel {
        const response: string = window.localStorage.getItem('userDetails') as any;
        return JSON.parse(response);
    }

    constructor(
        private apiService: ApiService
    ) {

    }

    loginClickHandler(postModel: any) {
        return this.apiService.post('login', postModel).toPromise().then((response: any) => {
            if (response && response.status) {
                window.localStorage.setItem('userDetails', JSON.stringify(response));
                return response;
            } else {
                return false;
            }
        });
    }

    getUserDetails(): UserDetailModel {
        return this.userDetail;
    }

    getLoggedInUserId(): number {
        return this.userDetail && this.userDetail.id;
    }

    isPermissionAvailable(permission: PermissionsList): boolean {
        return this.isAdminLoggedIn() || !!(this.userDetail && this.userDetail.permissions && this.userDetail.permissions.length && this.userDetail.permissions.includes(permission));
    }

    isUserLoggedIn(): boolean {
        return !!(this.userDetail && this.userDetail.id);
    }

    resetUserDetails() {
        // this.userDetail = null as any;
        window.localStorage.setItem('userDetails', null as any);
    }

    isAdminLoggedIn(): boolean {
        return this.isUserLoggedIn() && !!(this.userDetail && this.userDetail.role && this.userDetail.role.toUpperCase() === 'ADMIN');
    }

}