import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ApiService {

    private baseUrl: string = 'https://computinlab.000webhostapp.com/api/'

    constructor(
        private httpClient: HttpClient
    ) {

    }

    get(subpath: string, queryParams: { [params: string]: any } = {}): Observable<any> {
        return this.httpClient.get(this.getUrl(subpath), { params: queryParams });
    }

    post(subpath: string, postModel: any): Observable<any> {
        return this.httpClient.post(this.getUrl(subpath), postModel, { headers: {
            'Content-Type': 'text/plain'
        }});
    }

    getById(subpath: string, id: number): Observable<any> {
        return this.httpClient.get(this.getUrl(subpath), { params: { id: id.toString() } });
    }

    getUrl(subpath: string): string {
        return this.baseUrl + subpath + '.php';
    }

    delete(subpath: string, deleteModel: any): Observable<any> {
        return this.httpClient.post(this.getUrl(subpath), deleteModel,{ headers: {
            'Content-Type': 'text/plain'
        }})
    }

}