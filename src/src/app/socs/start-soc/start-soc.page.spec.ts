import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartSocPage } from './start-soc.page';

describe('StartSocPage', () => {
  let component: StartSocPage;
  let fixture: ComponentFixture<StartSocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartSocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartSocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
