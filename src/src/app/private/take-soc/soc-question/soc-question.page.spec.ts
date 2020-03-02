import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocQuestionPage } from './soc-question.page';

describe('SocQuestionPage', () => {
  let component: SocQuestionPage;
  let fixture: ComponentFixture<SocQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocQuestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
