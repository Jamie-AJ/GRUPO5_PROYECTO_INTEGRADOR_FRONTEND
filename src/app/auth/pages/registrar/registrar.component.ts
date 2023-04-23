import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from '../../interface/role.interface';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  roles: string ='empresa'
  step: any = 1;

  constructor(private builder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

  }
  setRole(role:string){
    this.roles = role;
    this.next();
  }
  next() {
    this.step++;
  }
  previus() {
    if(this.step > 1){
      this.step --;
    }else{
      this.router.navigate(['/auth/login']);
    }
  }
  createUser():void{
    this.router.navigate(['/dashboard/home']);
    console.log('crear usuario');
  }
}
