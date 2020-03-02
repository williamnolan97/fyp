import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewSocQuestionPage } from './add-new-soc-question.page';

describe('AddNewSocQuestionPage', () => {
  let component: AddNewSocQuestionPage;
  let fixture: ComponentFixture<AddNewSocQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSocQuestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewSocQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
