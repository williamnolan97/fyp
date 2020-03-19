import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CudSocPage } from './cud-soc.page';

describe('CudSocPage', () => {
  let component: CudSocPage;
  let fixture: ComponentFixture<CudSocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CudSocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CudSocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
