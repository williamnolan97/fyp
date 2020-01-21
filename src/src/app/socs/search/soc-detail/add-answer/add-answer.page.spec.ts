import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAnswerPage } from './add-answer.page';

describe('AddAnswerPage', () => {
  let component: AddAnswerPage;
  let fixture: ComponentFixture<AddAnswerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnswerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAnswerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
