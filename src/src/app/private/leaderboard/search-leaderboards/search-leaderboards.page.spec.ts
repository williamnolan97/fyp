import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchLeaderboardsPage } from './search-leaderboards.page';

describe('SearchLeaderboardsPage', () => {
  let component: SearchLeaderboardsPage;
  let fixture: ComponentFixture<SearchLeaderboardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLeaderboardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchLeaderboardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
