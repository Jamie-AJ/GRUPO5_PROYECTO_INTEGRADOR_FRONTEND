
import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresas } from 'src/app/interface/empresas.interface';
import { Factura } from 'src/app/interface/factura.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { FacturaService } from 'src/app/services/factura.service';
import * as customValidators from 'src/app/shared/components/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-factura',
  templateUrl: './add-factura.component.html',
  styleUrls: ['./add-factura.component.css']
})
export class AddFacturaComponent implements OnInit{
  title="Estas por ingresar una factura.";

  public factura:Factura = new Factura();
  public empresas:Empresas[] = [];
  public showNegativeNumberError = false;

  // objFactura: Factura = {

  // };

  constructor(
    private facturaService:FacturaService,
    private router: Router,
    private empresasServices:EmpresasService,
    private builder:FormBuilder,
    private activedRouter: ActivatedRoute) { }

    form:FormGroup = this.builder.group({
      monto:['',[Validators.required, customValidators.validarNumerosNegativos] ],
      fechaPago:[ '',[Validators.required]],
      // codigoFactura:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      empresa:['',[Validators.required]],
      // idEmpresa:['',[Validators.required]] 
    })


  ngOnInit(): void {
    this.getEmpresas();
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
          return 'Este valor es requerido';
        case 'pattern':
          return 'El valor ingresado no tiene formato válido';
        case 'negativeNumber':
          return 'El valor ingresado no puede ser negativo';
      }
    }
    return null;
  }
  getEmpresas(){
    this.empresasServices.getEmpresasActive().subscribe(resp =>{
      console.log(resp);
      this.empresas = resp;
    })
  }
  postFactura(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
   this.facturaService.postFactura(this.form.value).subscribe(
        resp =>{
          console.log(resp);
          Swal.fire('Factura Generada', resp.mensaje, 'success');
          this.router.navigate(['/dashboard/invoice/list-invoice']);
        }
      );
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    return `${year}-${this.padZero(month)}-${this.padZero(day)}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  goBack(){
    this.router.navigate(['/dashboard/invoice/list-invoice']);
  }
}


