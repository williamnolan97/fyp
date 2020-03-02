import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSocPage } from './view-soc.page';

describe('ViewSocPage', () => {
  let component: ViewSocPage;
  let fixture: ComponentFixture<ViewSocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
