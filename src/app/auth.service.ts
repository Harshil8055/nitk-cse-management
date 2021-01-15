import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

export enum PermissionsList {

}

export class UserDetailModel {
    id: number = null as any;
    name: string = null as any;
    role: string = null as any;
    permission: PermissionsList[] = [];
}

@Injectable()
export class AuthService {

    private userDetail: UserDetailModel = null as any;

    constructor(
        private apiService: ApiService
    ) {

    }

    loginClickHandler(postModel: any) {
        return this.apiService.post('login', postModel).toPromise().then((response: any) => {
            if (response && response.status) {
                this.userDetail = response;
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
        return this.isAdminLoggedIn() || !!(this.userDetail && this.userDetail.permission && this.userDetail.permission.length && this.userDetail.permission.includes(permission));
    }

    isUserLoggedIn(): boolean {
        return !!(this.userDetail && this.userDetail.id);
    }

    resetUserDetails() {
        this.userDetail = null as any;
    }

    isAdminLoggedIn(): boolean {
        return this.isUserLoggedIn() && this.userDetail.role.toUpperCase() === 'ADMIN';
    }

}