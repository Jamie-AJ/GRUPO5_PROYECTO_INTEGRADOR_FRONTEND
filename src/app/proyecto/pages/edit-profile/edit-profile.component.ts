import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { dniPattern, emailPattern, passwordPattern, telefonoPattern } from 'src/app/shared/components/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  mostrarInput: boolean = false;

  form: FormGroup = this.builder.group({
    id:[''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidoMa: ['',  [Validators.required, Validators.minLength(3)]],
    apellidoPa: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.pattern(dniPattern)]],
    correo: ['', [Validators.required, Validators.pattern(emailPattern)]],
    telefono: ['', [Validators.required, Validators.pattern(telefonoPattern)]],
    password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    username: ['', [Validators.required]],
    idTipoUsu:[ 1, [Validators.required]]
  });

  constructor(
    private userService:UserService,
    private activedRouter:ActivatedRoute, 
    private builder:FormBuilder,
    private router:Router,
    private loginService:LoginService){}


  ngOnInit(): void {
   this.activedRouter.params.pipe(
    switchMap(({id})=> this.loginService.getCurrentUser())
   ).subscribe(usuario => {
     this.form.reset(usuario);
   });
  }
  //validaciones
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
          return 'El valor ingresado no tiene formato válido';
      }
    }
    return null;
  }

  putUsuario(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    if(this.form.value.id){
      this.userService.actualizarUsuario(this.form.value).subscribe(resp =>{
        Swal.fire('Actualizado', resp.mensaje, 'success');
        this.router.navigate(['/dashboard/details-profile']);
      })
    }
   
  }
  goBack(){
    this.router.navigate(['/dashboard/']);
  }
}
