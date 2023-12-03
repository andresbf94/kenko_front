import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditPedidoComponent } from './edit-pedido.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('EditPedidoComponent', () => {
  let component: EditPedidoComponent;
  let fixture: ComponentFixture<EditPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPedidoComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPedidoComponent);
    component = fixture.componentInstance;
    component.pedidoId = 'your_sample_id'; // Set a sample id for testing
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.editForm).toBeDefined();
  });

  it('should add a new product', () => {
    component.ngOnInit();
    const initialProductCount = component.editForm.get('productos').length;
    component.anadirProducto();
    const finalProductCount = component.editForm.get('productos').length;
    expect(finalProductCount).toBeGreaterThan(initialProductCount);
  });

  it('should remove a product', () => {
    component.ngOnInit();
    component.anadirProducto(); // Add a product to have something to remove
    const initialProductCount = component.editForm.get('productos').length;
    component.eliminarProducto(0);
    const finalProductCount = component.editForm.get('productos').length;
    expect(finalProductCount).toBeLessThan(initialProductCount);
  });

  it('should submit the form', () => {
    component.ngOnInit();
    spyOn(component.pedidosService, 'updatePedido').and.returnValue(of({})); // Mock the service
    component.onSubmit();
    expect(component.pedidosService.updatePedido).toHaveBeenCalled();
  });

  it('should close the modal', () => {
    spyOn(component.activeModal, 'close');
    component.closeModal();
    expect(component.activeModal.close).toHaveBeenCalled();
  });
});