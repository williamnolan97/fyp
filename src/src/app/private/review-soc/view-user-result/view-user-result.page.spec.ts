import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewUserResultPage } from './view-user-result.page';

describe('ViewUserResultPage', () => {
  let component: ViewUserResultPage;
  let fixture: ComponentFixture<ViewUserResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewUserResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
