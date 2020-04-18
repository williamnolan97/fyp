/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: Typescript file for the search page.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserData } from 'src/app/models/userData.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  loadedUsers: UserData[];
  listUsers: UserData[];
  fullName: string;
  private usersSub: Subscription;
  isLoading = false;
  isItemAvailable = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.usersSub = this.authService.users.subscribe(users => {
      this.listUsers = users;
      this.loadedUsers = users;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.authService.fetchUsers().subscribe(() => {
      this.isLoading = false;
    });
  }

  initializeItems() {
    this.listUsers = this.loadedUsers;
  }

  filter(event: any) {
    this.initializeItems();
    this.fullName = '';
    const val = event.target.value;
    console.log(val);
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.listUsers = this.listUsers.filter((item) => {
        this.fullName = item.fname + ' ' + item.lname;
        return (this.fullName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }


  ngOnDestroy() {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }

}
