import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSocResultDetailPage } from './view-soc-result-detail.page';

describe('ViewSocResultDetailPage', () => {
  let component: ViewSocResultDetailPage;
  let fixture: ComponentFixture<ViewSocResultDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSocResultDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSocResultDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
