import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { dniPattern, emailPattern, passwordPattern, stringPattern, telefonoPattern } from 'src/app/shared/components/validators';

import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Role } from 'src/app/interface/role.interface';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  roles:Role[] = [];


  form: FormGroup = this.builder.group({
    nombre: ['', [Validators.required, Validators.pattern(stringPattern)]],
    apellidoMa: ['', [Validators.required, Validators.pattern(stringPattern)]],
    apellidoPa: ['', [Validators.required, Validators.pattern(stringPattern)]],
    dni: ['', [Validators.required, Validators.pattern(dniPattern)]],
    correo: ['', [Validators.required, Validators.pattern(emailPattern)]],
    telefono: ['', [Validators.required, Validators.pattern(telefonoPattern)]],
    password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    username: ['', [Validators.required]],
    idTipoUsu:[ 1, [Validators.required]]
  });

  step: any = 1;

  constructor(
    private builder: FormBuilder, 
    private router: Router, 
    private usuarioService: UserService) { }

  ngOnInit(): void {
    this.usuarioService.listarRoles().subscribe(roles =>{
      this.roles = roles;
    });
  }
  previus() {
    if (this.step > 1) {
      this.step--;
    } else {
      this.router.navigate(['/auth/login']);
    } 
  }
  //VALIDACIONES
  isValid(field: string) {
    return this.form.controls[field].errors && this.form.controls[field].touched;
  }
  getFieldError(field: string): string | null {
    if (!this.form.controls[field]) return null;
    const errors = this.form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Debe tener Minimo ${errors['minlength']['requiredLength']} caracteres`;
        case 'pattern':
          return `El valor ingresado no tiene formato válido`;
      }
    }
    return null;
  }

  //TODO: REGISTRAR
  onSubmit() {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    } 
    this.usuarioService.añadirUsuario(this.form.value).subscribe(resp =>{
      Swal.fire('Exito', resp.mensaje, 'success');
      this.router.navigate(['/auth/login']);
    });
  }
}
