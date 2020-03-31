import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewProgressionPage } from './review-progression.page';

describe('ReviewProgressionPage', () => {
  let component: ReviewProgressionPage;
  let fixture: ComponentFixture<ReviewProgressionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewProgressionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewProgressionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
