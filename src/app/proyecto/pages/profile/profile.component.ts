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

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,private builder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.userService.getUsuarioById(id))
    ).subscribe(usuario =>
      {
        if(!usuario)return this.router.navigate(['/dashboard/dashboard']);
        this.usuario = usuario;
        console.log(usuario);
        return;
      })
      
    // this.id = this.activatedRoute.snapshot.params[ 'id' ];
    // this.userService.getUsuarioById(this.id).subscribe((res) =>
    // { 
    //   this.usuario = res;
    //   console.log(res);
    // }, (error) => { console.log(error) });
  }
  // mostrarFormulario(){
  //   this.mostrarForm = true;
  // }

 
}
