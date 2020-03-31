import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewUserProgressionPage } from './review-user-progression.page';

describe('ReviewUserProgressionPage', () => {
  let component: ReviewUserProgressionPage;
  let fixture: ComponentFixture<ReviewUserProgressionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewUserProgressionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewUserProgressionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
