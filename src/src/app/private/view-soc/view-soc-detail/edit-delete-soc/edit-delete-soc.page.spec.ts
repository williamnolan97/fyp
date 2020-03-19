import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDeleteSocPage } from './edit-delete-soc.page';

describe('EditDeleteSocPage', () => {
  let component: EditDeleteSocPage;
  let fixture: ComponentFixture<EditDeleteSocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeleteSocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDeleteSocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
