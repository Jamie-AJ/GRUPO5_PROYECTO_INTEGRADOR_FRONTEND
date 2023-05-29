import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresas } from 'src/app/interface/empresas.interface';
import { Factura } from 'src/app/interface/factura.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { FacturaService } from 'src/app/services/factura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-factura',
  templateUrl: './add-factura.component.html',
  styleUrls: ['./add-factura.component.css']
})
export class AddFacturaComponent implements OnInit{
  title="Factura de Empresas";

  // factura:Factura = new Factura();
  // objFactura: Factura = {

  // };
  public objEmpresa?: Empresas;
 public empresas:Empresas[] = [];
 public mostrarAlerta: boolean = false;
 public seEncontraronResultados: boolean = false;
 public isLoading: boolean = false;

  constructor(
    private facturaService:FacturaService,
    private router: Router,
    private empresasServices:EmpresasService,
    private builder:FormBuilder,
    private activedRouter: ActivatedRoute) { }

    form:FormGroup = this.builder.group({
      monto:['',[Validators.required,Validators.minLength(1)]],
      fechaPago:['',[Validators.required]],
      codigoFactura:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      empresa:['',[Validators.required]],
      idEmpresa:['',[Validators.required]],
    })

   
  ngOnInit(): void {
    // this.activedRouter.params.subscribe(params =>{
    //   let id = +params['id'];
    //   this.empresasServices.getEmpresasById(id).subscribe(empresas =>{
    //     this.objEmpresa = empresas;
    //   })
    // })
  }
  //VALIDACIONES
  isValid(field: string) {
    return this.form.controls[field].errors && this.form.controls[field].touched;
  }
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
  
  postFactura(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.facturaService.postFactura(this.form.value).subscribe(
      resp =>{
        console.log(resp);
        this.form.reset();
        Swal.fire('Factura Generada', resp.mensaje, 'success');
        this.router.navigate(['/facturas/list-factura']);
      }
    )
  }
  goBack(){
    this.router.navigate(['/facturas/list-factura']);
  }
}
