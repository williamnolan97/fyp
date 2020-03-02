import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocResultPage } from './soc-result.page';

describe('SocResultPage', () => {
  let component: SocResultPage;
  let fixture: ComponentFixture<SocResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
