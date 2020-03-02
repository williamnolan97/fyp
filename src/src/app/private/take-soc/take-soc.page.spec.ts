import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakeSocPage } from './take-soc.page';

describe('TakeSocPage', () => {
  let component: TakeSocPage;
  let fixture: ComponentFixture<TakeSocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeSocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakeSocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
