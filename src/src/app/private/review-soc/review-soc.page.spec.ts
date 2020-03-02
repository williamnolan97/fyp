import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewSocPage } from './review-soc.page';

describe('ReviewSocPage', () => {
  let component: ReviewSocPage;
  let fixture: ComponentFixture<ReviewSocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewSocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewSocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
