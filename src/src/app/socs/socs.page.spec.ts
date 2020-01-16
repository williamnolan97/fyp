import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocsPage } from './socs.page';

describe('SocsPage', () => {
  let component: SocsPage;
  let fixture: ComponentFixture<SocsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
