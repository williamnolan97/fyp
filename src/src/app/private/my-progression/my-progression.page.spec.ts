import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyProgressionPage } from './my-progression.page';

describe('MyProgressionPage', () => {
  let component: MyProgressionPage;
  let fixture: ComponentFixture<MyProgressionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProgressionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyProgressionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
