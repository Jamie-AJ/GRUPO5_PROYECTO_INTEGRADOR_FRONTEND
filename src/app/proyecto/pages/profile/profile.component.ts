import { Component, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/interface/usuario.interface';

import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dniPattern, emailPattern, passwordPattern, telefonoPattern } from 'src/app/shared/components/validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit{

  mostrarForm:boolean = false;
  id:number = 0;
  usuario:Usuario = {
    id:0,
    nombre:'',
    apellidoPa:'',
    apellidoMa:'',
    telefono:'',
    correo:'',
    dni:'',
  }

  form: FormGroup = this.builder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidoMa: ['', [Validators.required, Validators.minLength(3)]],
    apellidoPa: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.pattern(dniPattern)]],
    correo: ['', [Validators.required, Validators.pattern(emailPattern)]],
    telefono: ['', [Validators.required, Validators.pattern(telefonoPattern)]],
    password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    username: ['', [Validators.required]],
    idTipoUsu:[ 1, [Validators.required]]
  });
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,private builder:FormBuilder) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params[ 'id' ];
    this.userService.getUsuarioById(this.id).subscribe((res) =>
    {
      this.usuario = res;
      console.log(res);
    }, (error) => { console.log(error) });
  }
  mostrarFormulario(){
    this.mostrarForm = true;
  }
  searchUser(usuario:Usuario){
    this.form.reset(usuario);
    console.log(usuario);
  }

  putUsuario(){
    this.userService.actualizarUsuario(this.form.value).subscribe((res)=>{
      console.log(res);
    })
  }
}
