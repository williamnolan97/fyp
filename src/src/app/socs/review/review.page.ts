import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserData } from 'src/app/auth/userData.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit, OnDestroy {
  loadedUsers: UserData[];
  listUsers: UserData[];
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

    const val = event.target.value;
    console.log(val);
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.listUsers = this.listUsers.filter((item) => {
        return (item.fullName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }


  ngOnDestroy() {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }

}
