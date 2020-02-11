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

interface UserDataInterface {
  id: string;
  email: string;
  fname: string;
  lname: string;
  fullName: string;
  userId: string;
  socs: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private _currUser = new BehaviorSubject<UserData>(null);
  private _users = new BehaviorSubject<UserData[]>([]);

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

  get users() {
    return this._users.asObservable();
  }

  constructor(
    private http: HttpClient,
  ) { }

  fetchUsers() {
    return this.http
      .get<{[key: string]: UserDataInterface}>(
        'https://fyp-wnolan.firebaseio.com/user.json'
      )
      .pipe(map(resData => {
        const users = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            for (const key2 in resData[key]) {
              if (resData[key].hasOwnProperty(key2)) {
                users.push(new UserData(
                  key2,
                  resData[key][key2].email,
                  resData[key][key2].fname,
                  resData[key][key2].lname,
                  resData[key][key2].fullName,
                  resData[key][key2].userId,
                  resData[key][key2].socs
                )
                );
              }
            }
          }
        }
        users.sort((a, b) => {
          return a.lname.localeCompare(b.lname) ||
            a.fname.localeCompare(b.fname) || 0;
        });
        return users;
      }),
      tap(users => {
        this._users.next(users);
      })
    );
  }

  getUser(id: string) {
    return this.http
    .get<UserData>(
      `https://fyp-wnolan.firebaseio.com/user/${id}.json`
    )
    .pipe(
      map(resData => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            return new UserData(
              key,
              resData[key].email,
              resData[key].fname,
              resData[key].lname,
              resData[key].fullName,
              resData[key].userId,
              resData[key].socs
            );
          }
        }
      })
    );
  }

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
      fname + ' ' + lname,
      userId,
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
              resData[key].fullName,
              resData[key].userId,
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
