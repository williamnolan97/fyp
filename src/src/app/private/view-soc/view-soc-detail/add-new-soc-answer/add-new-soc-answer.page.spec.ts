import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewSocAnswerPage } from './add-new-soc-answer.page';

describe('AddNewSocAnswerPage', () => {
  let component: AddNewSocAnswerPage;
  let fixture: ComponentFixture<AddNewSocAnswerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSocAnswerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewSocAnswerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
