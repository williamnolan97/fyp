import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyResultsPage } from './my-results.page';

describe('MyResultsPage', () => {
  let component: MyResultsPage;
  let fixture: ComponentFixture<MyResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyResultsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
