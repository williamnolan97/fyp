import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeRolePage } from './change-role.page';

describe('ChangeRolePage', () => {
  let component: ChangeRolePage;
  let fixture: ComponentFixture<ChangeRolePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRolePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeRolePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
