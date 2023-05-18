import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { dniPattern, emailPattern, passwordPattern, telefonoPattern } from 'src/app/shared/components/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  
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
    private router:Router){}


  ngOnInit(): void {
   this.activedRouter.params.pipe(
    switchMap(({id})=> this.userService.getUsuarioById(id))
   ).subscribe(usuario => {
     this.form.reset(usuario);
   });
  }
  putUsuario(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    if(this.form.value.id){
      this.userService.actualizarUsuario(this.form.value).subscribe(resp =>{
        Swal.fire('Actualizado', resp.mensaje, 'success');
        this.router.navigate(['/dashboard/:id']);
      })
    }
   
  }
  goBack(){
    this.router.navigate(['/dashboard/']);
  }
}
