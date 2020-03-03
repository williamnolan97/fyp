import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocLeaderboardPage } from './soc-leaderboard.page';

describe('SocLeaderboardPage', () => {
  let component: SocLeaderboardPage;
  let fixture: ComponentFixture<SocLeaderboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocLeaderboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocLeaderboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
