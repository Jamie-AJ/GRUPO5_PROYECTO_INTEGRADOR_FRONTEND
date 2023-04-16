import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  form:FormGroup =this.formBuilder.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]]
  })

  constructor(private formBuilder:FormBuilder){}

  login(){
    console.log(this.form.value);
  }
}
