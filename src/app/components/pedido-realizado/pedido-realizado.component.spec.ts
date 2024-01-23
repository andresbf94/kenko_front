import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoRealizadoComponent } from './pedido-realizado.component';

describe('PedidoRealizadoComponent', () => {
  let component: PedidoRealizadoComponent;
  let fixture: ComponentFixture<PedidoRealizadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoRealizadoComponent]
    });
    fixture = TestBed.createComponent(PedidoRealizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
