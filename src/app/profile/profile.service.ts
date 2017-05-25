import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { UserProfileVM } from '../user/userprofilevm';
import { UserProfile } from './userprofile';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService {

  resourceBaseUrl: string;
  // TODO Redirect back to login when token expires
  constructor(
    private loginService: LoginService,
    private http: Http) {
    this.resourceBaseUrl = environment.apiBaseUrl + '/api/users/'
  }

  getUserProfile(): Observable<UserProfile> {
    const authClaim = this.loginService.getAuthenticatedUser();
    return this.http.get(
        this.resourceBaseUrl + authClaim.sub,
        this.loginService.getRequestOptions()
      ).map(response => new UserProfile(response.json()))
  }

  updateUserProfile(userProfile: UserProfileVM): Observable<string> {
    return this.http.put(this.resourceBaseUrl, userProfile, this.loginService.getRequestOptions())
        .map(response => 'Profile successfully updated')
        .catch(error => this.handleError(error));
  }

   handleError(error: any) {
     const errMsg = error.headers.get('X-schedulesys-error');
     console.log('Error message : ' + errMsg)
     return Observable.throw(errMsg);
  }
}