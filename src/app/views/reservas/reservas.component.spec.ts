import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservasComponent } from './reservas.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MailService } from 'src/app/services/mail.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { JwtModule } from '@auth0/angular-jwt';

describe('ReservasComponent', () => {
  let component: ReservasComponent;
  let fixture: ComponentFixture<ReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservasComponent, HeaderComponent, FooterComponent,],
      imports: [ReactiveFormsModule, HttpClientTestingModule,  JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('token'), // Obtén el token de localStorage
          allowedDomains: ['example.com'], // Dominios permitidos (opcional)
          disallowedRoutes: ['example.com/login'], // Rutas excluidas (opcional)
        },
      }),],
      providers: [MailService, ReservasService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creacion', () => {
    expect(component).toBeTruthy();
  });

  it('inicializacion del formulario', () => {
    const formValues = {
      nombre: '',
      email: '',
      numPer: '',
      hora: '',
      fecha: '',
      observaciones: ''
    };

    expect(component.formulario.value).toEqual(formValues);
  });

  it('reset de la variable al llamar a la funcion eliminarMensaje', () => {
    component.mensaje = 'Some error message';

    component.eliminarMensaje();

    expect(component.mensaje).toBe('');
  });
});