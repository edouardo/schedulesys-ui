import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { UserProfile } from '../profile/userprofile';
import { CommonService } from '../shared/commonservice';
import { UserProfileVM } from './userprofilevm';
import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService extends CommonService {

  private resourceUrl = environment.apiBaseUrl + '/api/users';
  private httpOptions: RequestOptions;

  constructor(
    private http: Http,
    private loginService: LoginService) {super();
      this.httpOptions = this.loginService.getRequestOptions();
    }

  createUser(user: UserProfileVM): Observable<string> {
    return this.http.post(this.resourceUrl, user, this.httpOptions)
              .map(response => 'User successfully created')
              .catch(this.handleError);
  }

  updateUser(user: UserProfileVM): Observable<string> {
    return this.http.put(this.resourceUrl, user, this.httpOptions)
              .map(response => 'User successfully updated')
              .catch(this.handleError);
  }

  getAllUsers() {
    return this.http.get(this.resourceUrl, this.httpOptions)
              .map(response => {
                  return UserProfile.toArray(response.json())
              }).catch(this.handleError);
  }

  deleteUser(username: string): Observable<string> {
    return this.http.delete(this.resourceUrl + '/' + username, this.httpOptions)
            .map(response => 'User successfully deleted')
            .catch(this.handleError);
  }

  getUserByUsername(username: string): Observable<UserProfile> {
    return this.http.get(this.resourceUrl + '/' + username, this.httpOptions)
            .map(response => new UserProfile(response.json()))
            .catch(this.handleError);
  }

  getUserByEmailAddress(emailAddress: string): Observable<UserProfile> {
    return this.http.get(this.resourceUrl + '/' + emailAddress + '?by=email', this.httpOptions)
            .map(response => new UserProfile(response.json()))
            .catch(this.handleError);
  }

}
