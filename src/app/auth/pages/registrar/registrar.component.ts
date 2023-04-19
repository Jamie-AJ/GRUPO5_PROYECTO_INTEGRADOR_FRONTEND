import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {


  step: any = 1;
  form = this.builder.group({
    userDetails: this.builder.group({

    }),

  })

  constructor(private builder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

  }
  next() {
    this.step = this.step + 1;
  }
  previus() {
    if(this.step > 1){
      this.step = this.step - 1;
    }else{
      this.router.navigate(['/auth/login']);
    }
  }
}
