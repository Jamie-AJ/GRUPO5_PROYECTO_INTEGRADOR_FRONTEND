import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, ValidationErrors } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interface/usuario.interface';
import { LoginService } from 'src/app/services/login.service';
import { passwordPattern } from 'src/app/shared/components/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLoading = false;

  form:FormGroup =this.formBuilder.group({
    username:['',[Validators.required,Validators.minLength(2)]],
    password:['',[Validators.required,Validators.pattern(passwordPattern)]]
  })

  constructor(private formBuilder:FormBuilder, private loginService:LoginService, private router:Router){}
  
  ngOnInit(): void {
    
  }
  isValid(field: string) {
    return this.form.controls[field].errors && this.form.controls[field].touched;
  }
//VALIDACIONES
  getFieldError(field: string): string | null {
    if (!this.form.controls[field]) return null;
    const errors:ValidationErrors = this.form.controls[field].errors || {};
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
  formSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.loginService.generateToken(this.form.value).subscribe(
      (data:any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          this.loginService.setUser(user);
          console.log(user);
          if(this.loginService.getUserRole() == 'INVERSIONISTA'){
            //dashboard admin
            //window.location.href = '/admin';
            this.router.navigate(['dashboard/']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if(this.loginService.getUserRole() == 'ADMIN'){
            //user dashboard
            //window.location.href = '/user-dashboard';
            this.router.navigate(['/dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else{
            this.loginService.logout();
          }
          this.isLoading = false;
        })
      },(error) => {
        console.log(error);
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Datos Incorrectos',
        })
      }
    )
  }

  }