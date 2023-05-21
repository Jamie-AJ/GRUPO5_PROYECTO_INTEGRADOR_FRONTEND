import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interface/usuario.interface';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginData = {
    "username" : '',
    "password" : '',
  }
  objUsuario: Usuario = {
    id: 0,
    nombre: '',
    apellidoPa: '',
    apellidoMa: '',
    correo: '',
    telefono: '',
    dni: ''
  }
  form:FormGroup =this.formBuilder.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]]
  })

  constructor(private formBuilder:FormBuilder, private loginService:LoginService, private router:Router){}
  ngOnInit(): void {
  }
  formSubmit(){
    
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'usuario requerido',
      })
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'contraseña requerida',
      })
      return;
    }
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          Swal.fire({
            icon: 'success',
            title: `Bienvenido ${user.nombre}`,
            text:'Iniciaste sesion correctamente' ,
          });
          this.loginService.setUser(user);
          console.log(user);
          if(this.loginService.getUserRole() == 'INVERSIONISTA'){
            //dashboard admin
            //window.location.href = '/admin';
            this.router.navigate(['dashboard/dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }
          /*else if(this.loginService.getUserRole() == 'por defecto'){
            //user dashboard
            //window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }*/
          else{
            this.loginService.logout();
          }

        })
      },(error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Datos Incorrectos',
        })
      }
    )
  }

  }