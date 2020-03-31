import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSocResultPage } from './view-soc-result.page';

describe('ViewSocResultPage', () => {
  let component: ViewSocResultPage;
  let fixture: ComponentFixture<ViewSocResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSocResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSocResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
