/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: This service handles all the user authentication
 *              from the back-end.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { map, tap, switchMap, take } from 'rxjs/operators';
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
  role: number;
  socs: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private _currUser = new BehaviorSubject<UserData>(null);
  private _users = new BehaviorSubject<UserData[]>([]);


  /**
   * Returns whether the current user is authenticated.
   *
   * @return    true/ false if user is authenticated
   */
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

  /**
   * Returns the current user ID.
   *
   * @return    User ID
   */
  get userId() {
    return this._currUser.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  /**
   * Returns the current user's role.
   *
   * @return      -1 - 2
   *              -1 - Default Unassigned Role
   *              0 - Crew Member
   *              1 - Crew Trainer
   *              2 - Manager
   */
  get userRole() {
    return this._currUser.asObservable().pipe(
      map(user => {
        if (user) {
          return user.role;
        } else {
          return null;
        }
      })
    );
  }

  /**
   * Returns the current user.
   *
   * @return    User
   */
  get currUser() {
    return this._currUser.asObservable();
  }

  /**
   * Returns the all users.
   *
   * @return    Users
   */
  get users() {
    return this._users.asObservable();
  }

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Fetches all the users from back-end.
   *
   * @return    Subscribable.
   */
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
              resData[key].role,
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

  /**
   * Fetches specified user from back-end.
   *
   * @param     string id
   * @return    Subscribable.
   */
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
            resData.role,
            resData.socs
          );
      })
    );
  }


  /**
   * Signs up a user,
   *
   * @param     string email
   * @param     string password
   * @return    Subscribable.
   */
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
        environment.firebaseAPIKey
      }`,
      {email, password, returnSecureToken: true}
    ).pipe(tap(this.setUserData.bind(this)));
  }

  /**
   * Creates user object in back-end.
   *
   * @param     string userId
   * @param     string email
   * @param     string fname
   * @param     string lname
   * @return    Subscribable.
   */
  createUser(userId: string, email: string, fname: string, lname: string) {
    const newUser = new UserData(
      userId,
      email,
      fname,
      lname,
      -1,
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

  /**
   * Logs user into system.
   *
   * @param     string email
   * @param     string password
   * @return    Subscribable.
   */
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
        environment.firebaseAPIKey
      }`,
      {email, password}
    ).pipe(tap(this.setUserData.bind(this)));
  }

  /**
   * Updates currently logged in user info.
   *
   * @param     string id
   * @return    Subscribable.
   */
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
            userData.role,
            userData.socs
          ));
        })
      );
  }


  /**
   * Updates a user's role.
   *
   * @param     number role
   * @param     UserData selectedUser
   * @return    Subscribable.
   */
  updateRole(role: number, selectedUser: UserData) {
    let generatedId: string;
    const newUser = new UserData(
      selectedUser.id,
      selectedUser.email,
      selectedUser.fname,
      selectedUser.lname,
      role,
      []
    );
    return this.http.put<{name: string}>(`https://fyp-wnolan.firebaseio.com/user/${selectedUser.id}.json`, {
      ...newUser,
      id: null
    })
    .pipe(
      switchMap(resData => {
        generatedId = resData.name;
        return this.users;
      }),
      take(1),
      tap(users => {
        newUser.id = generatedId;
        this._users.next(users.concat(newUser));
      })
    );
  }

  /**
   * Logs the current user out.
   */
  logout() {
    this._user.next(null);
  }

  /**
   * Sets the current user's authenication data.
   *
   * @param AuthResponseData userData
   */
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
