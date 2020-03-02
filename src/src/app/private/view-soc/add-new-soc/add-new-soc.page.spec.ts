import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewSocPage } from './add-new-soc.page';

describe('AddNewSocPage', () => {
  let component: AddNewSocPage;
  let fixture: ComponentFixture<AddNewSocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewSocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
