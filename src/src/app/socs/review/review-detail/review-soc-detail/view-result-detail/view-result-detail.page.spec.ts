import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewResultDetailPage } from './view-result-detail.page';

describe('ViewResultDetailPage', () => {
  let component: ViewResultDetailPage;
  let fixture: ComponentFixture<ViewResultDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewResultDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewResultDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
