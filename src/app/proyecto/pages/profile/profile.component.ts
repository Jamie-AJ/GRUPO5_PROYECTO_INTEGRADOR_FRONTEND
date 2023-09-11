import { Component, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/interface/usuario.interface';

import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dniPattern, emailPattern, passwordPattern, telefonoPattern } from 'src/app/shared/components/validators';
import { LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  title='Mis datos personales';
  
  isAdministrador = this.loginService.getUserRole() === 'ADMIN';
  showModal:boolean = false;
  usuario: Usuario = new Usuario();
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private modalService: ModalService,
    private userService: UserService) { }
  
  ngOnInit(): void {
    this.getUsuarioAct();
    this.modalService.$modal.subscribe((value) => { 
      this.showModal = value;
    });
  }
  getUsuarioAct(){
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.loginService.getCurrentUser())
    ).subscribe(usuario =>
      {
        if(!usuario) return this.router.navigate(['/dashboard/dashboard']);
        this.usuario = usuario;
        // console.log(usuario);
        return;
    })
  }
  openModal() { 
    this.showModal = true;
  }
  concatNameComplete() {
    return `${this.usuario.nombre} ${this.usuario.apellidoPa} ${this.usuario.apellidoMa}`;
  }
}
