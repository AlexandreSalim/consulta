import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoInformationsComponent } from './contato-informations.component';

describe('ContatoInformationsComponent', () => {
  let component: ContatoInformationsComponent;
  let fixture: ComponentFixture<ContatoInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContatoInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContatoInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
