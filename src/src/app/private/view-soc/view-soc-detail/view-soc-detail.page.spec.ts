import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSocDetailPage } from './view-soc-detail.page';

describe('ViewSocDetailPage', () => {
  let component: ViewSocDetailPage;
  let fixture: ComponentFixture<ViewSocDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSocDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSocDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
