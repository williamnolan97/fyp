import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocDetailPage } from './soc-detail.page';

describe('SocDetailPage', () => {
  let component: SocDetailPage;
  let fixture: ComponentFixture<SocDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
