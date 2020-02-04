import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';
import { UserData } from './userData.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private _currUser = new BehaviorSubject<UserData>(null);

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  get currUser() {
    return this._currUser.asObservable();
  }

  constructor(
    private http: HttpClient,
  ) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
        environment.firebaseAPIKey
      }`,
      {email, password, returnSecureToken: true}
    ).pipe(tap(this.setUserData.bind(this)));
  }

  createUser(userId: string, email: string, fname: string, lname: string) {
    const newUser = new UserData(
      userId,
      email,
      fname,
      lname,
      []
    );
    return this.http
      .post(`https://fyp-wnolan.firebaseio.com/user/${userId}.json`, {
        ...newUser,
        id: null
      })
      .pipe(
        tap(() => {
          this._currUser.next(newUser);
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
        environment.firebaseAPIKey
      }`,
      {email, password}
    ).pipe(tap(this.setUserData.bind(this)));
  }

  updateCurrUser(id: string) {
    return this.http
      .get<{[key: string]: UserData}>(
        `https://fyp-wnolan.firebaseio.com/user/${id}.json`
      )
      .pipe(map(resData => {
        // console.log(resData);
        const user = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            // console.log(key);
            // console.log(resData[key].id);
            // console.log(resData[key].socs);
            user.push(new UserData(
              key,
              resData[key].email,
              resData[key].fname,
              resData[key].lname,
              resData[key].socs
            ));
          }
        }
        return user;
      }),
      tap(user => {
        this._currUser.next(user[0]);
      })
    );
  }

  logout() {
    this._user.next(null);
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
    this._user.next(new User(
      userData.localId,
      userData.email,
      userData.idToken,
      expirationTime
    ));
  }
}
