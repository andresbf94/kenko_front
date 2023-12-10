import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoComponent } from './carrito.component';
import { CarritoService } from 'src/app/services/carrito.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { of } from 'rxjs';

describe('CarritoComponent', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;
  let carritoServiceSpy: jasmine.SpyObj<CarritoService>;
  let usuariosServiceSpy: jasmine.SpyObj<UsuariosService>;
  let pedidosServiceSpy: jasmine.SpyObj<PedidosService>;

  beforeEach(() => {
    carritoServiceSpy = jasmine.createSpyObj('CarritoService', ['enviarPedido']);
    usuariosServiceSpy = jasmine.createSpyObj('UsuariosService', ['getUserById', 'getToken', 'getUserID']);
    pedidosServiceSpy = jasmine.createSpyObj('PedidosService', ['enviarPedido']);

    TestBed.configureTestingModule({
      declarations: [CarritoComponent],
      providers: [
        { provide: CarritoService, useValue: carritoServiceSpy },
        { provide: UsuariosService, useValue: usuariosServiceSpy },
        { provide: PedidosService, useValue: pedidosServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send the pedido successfully', async () => {
    const userData = { _id: 'user123', direccion: 'Calle X' };
    const carritoData = [{ producto: 'Producto A' }, { producto: 'Producto B' }];

    usuariosServiceSpy.getUserById.and.returnValue(of(userData));
    usuariosServiceSpy.getToken.and.returnValue('fakeToken');
    usuariosServiceSpy.getUserID.and.returnValue('user123');
    carritoServiceSpy.carrito = carritoData;

    await component.enviarPedido();

    expect(usuariosServiceSpy.getUserById).toHaveBeenCalled();
    expect(pedidosServiceSpy.enviarPedido).toHaveBeenCalledWith({
      user_id: 'user123',
      direccion: 'Calle X',
      productos: carritoData,
    });
    expect(carritoServiceSpy.carrito).toEqual([]);
    expect(component.pedidoEnviado).toBe(true);
  });

  it('should handle errors during sending pedido', async () => {
    usuariosServiceSpy.getUserById.and.throwError('Fake error');

    await component.enviarPedido();

    expect(console.error).toHaveBeenCalledWith('Error al obtener los datos del usuario o enviar el pedido', jasmine.any(String));
    expect(component.pedidoEnviado).toBe(false);
  });
});