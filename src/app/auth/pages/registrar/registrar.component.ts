import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  form = this.builder.group({
    userDetails: this.builder.group({

    }),
    
  })

  constructor( private builder:FormBuilder) { }

  ngOnInit(): void {
  }
}
