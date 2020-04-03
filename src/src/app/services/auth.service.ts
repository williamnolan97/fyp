import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { map, tap } from 'rxjs/operators';
import { UserData } from '../models/userData.model';
import { environment } from 'src/environments/environment';

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
            users.push(new UserData(
              key,
              resData[key].email,
              resData[key].fname,
              resData[key].lname,
              resData[key].socs
            ));
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
          return new UserData(
            id,
            resData.email,
            resData.fname,
            resData.lname,
            resData.socs
          );
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

  createUser(userId: string, email: string, fname: string, lname: string, role: number) {
    const newUser = new UserData(
      userId,
      email,
      fname,
      lname,
      []
    );
    return this.http
      .put(`https://fyp-wnolan.firebaseio.com/user/${userId}.json`, {
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
      .get<UserDataInterface>(
        `https://fyp-wnolan.firebaseio.com/user/${id}.json`
      )
      .pipe(
        map(userData => {
          this._currUser.next(new UserData(
            id,
            userData.email,
            userData.fname,
            userData.lname,
            userData.socs
          ));
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
