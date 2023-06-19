import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresas } from 'src/app/interface/empresas.interface';
import { Factura } from 'src/app/interface/factura.interface';
import { Oportunidades } from 'src/app/interface/oportunidades.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { FacturaService } from 'src/app/services/factura.service';
import { OportunidadesService } from 'src/app/services/oportunidades.service';
import Swal from 'sweetalert2';
import * as customValidators from 'src/app/shared/components/validators';
import { OnExit } from '../../../../../guards/exits.guard';
import { Observable, first } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';



@Component({
  selector: 'app-add-oportunities',
  templateUrl: './add-oportunities.component.html',
  styleUrls: ['./add-oportunities.component.css']
})
export class AddOportunitiesComponent implements OnInit, OnExit {

  public objOportunidades: Oportunidades = new Oportunidades();
  public factura: Factura = new Factura();
  public empresas: Empresas[] = [];
  public facturaList: Factura[] = [];
  public mostrarAlerta: boolean = false;
  public seEncontraronResultados: boolean = false;
  public empresaFacturasRegistradas: boolean = false;
  public isLoading: boolean = false;
  public empresaSeleccionada: any;
  public montoTotal: number = 0;
  public agregarFactura: boolean = true;
  public showModal: boolean = false;
  public display = false;


  
  constructor(private empresasServices: EmpresasService,
    private facturaService: FacturaService,
    private oportunidadesService: OportunidadesService,
    private toastService: ToastrService,
    private router: Router,
    private modalService: ModalService,
    private builder: FormBuilder) { }

    form: FormGroup = this.builder.group({
      rendimiento: ['', [Validators.required, customValidators.validarNumerosNegativos]],
      monto: [''],
      fechaCaducidad: ['', [Validators.required]],
      tir: ['', [Validators.required, customValidators.validarNumerosNegativos]],
    });

  ngOnInit(): void {
    this.clearArrayList();
    this.modalService.showModal$.subscribe(show => {
      this.display = show;
    });
  }
  
  //esta funcion muestra un modal y retorna una promesa que se resuelve a verdadero si el modal se cierra sin cancelar el registro, y falso si el modal cancela el registro.
  //se consume el ModalService para mostrar el modal y retorna una promesa que resuelve si el modal se cierra sin cancelar el registro o no.
 /**
   * This function shows a modal and returns a promise that resolves to true if the modal is closed
   * without canceling the registration, and false if the modal cancels the registration.
   * @returns The onExit function returns an Observable that emits a boolean or UrlTree, a Promise that
   * resolves to a boolean or UrlTree, or a boolean or UrlTree directly. The function first sets a flag
   * in a modal service to show a modal, then returns a Promise that resolves based on whether the
   * modal was closed without canceling the registration or not. The Promise is resolved with true if
   * the modal was
   */
  onExit(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.modalService.setShowModal(true);
    return new Promise<boolean>((resolve, reject) => {
      this.modalService.showModal$.pipe(first()).subscribe(show => {
        if (!show) {
          // Modal cerrado sin cancelar el registro
          resolve(false);
        } else {
          // Modal canceló el registro
          resolve(true);
        }
      });
    });
  }
  clearArrayList() {
    this.oportunidadesService.getRefrescarFacturas().subscribe((response: any) => { 
      const facturas = response.facturas;
      console.log(facturas);
    });
  }
  closeWithoutCancel(): void {
    // Acción al cerrar el modal sin cancelar el registro
    this.modalService.setShowModal(false);
    
  }
  
  cancelRegistration(): void {
    // Acción al cancelar el registro
    this.clearArrayList();
    this.modalService.setShowModal(true);
  }

  filterEmpresas(keyword: String): void {
    this.isLoading = true;
    this.empresasServices.filterEmpresas(keyword).subscribe(empresas => {
      this.empresas = empresas;
      this.isLoading = false;
      this.seEncontraronResultados = this.empresas.length > 0;
    }, err => {
      console.log(err);
      this.mostrarAlerta = true;
    });
  }

  //VALIDACIONES
  isValid(field: string) {
    return this.form.controls[field].errors && this.form.controls[field].touched;
  }
  getFieldError(field: string): string | null {
    if (!this.form.controls[field]) return null;
    const errors: ValidationErrors = this.form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Debe tener Minimo ${errors['minlength']['requiredLength']} caracteres`;
        case 'pattern':
          return 'El valor ingresado no tiene formato válido';
        case 'negativeNumber':
          return 'El valor ingresado no puede ser negativo';
      }
    }
    return null;
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

  goBack() {
    this.router.navigate(['/inversiones/list-inversion']);
  }
  /*VALIDACIÓN*/
  //RECUPERA LAS FACTURAS DE LA EMPRESA SELECCIONADA
  //NO ITERA LAS FACTURAS DE LA EMPRESA SELECCIONADA EN EL HTML
  addFacturaporEmpresas(empresa: Empresas) {
    if (empresa.idEmpresa === undefined) {
      return;
    }
    this.empresaSeleccionada = empresa;
    this.facturaService.getFacturasXEmpresa(empresa.idEmpresa).subscribe((response: any) => {
      const facturas = response.facturas;
      console.log(facturas);
      this.facturaList = facturas;
      this.empresaFacturasRegistradas = facturas.length > 0;
      // Sumar los montos de las facturas agregadas
    });
  }

  addFacturaOportunidad(factura: Factura) {
    if (factura.idFactura === undefined) {
      return;
    }
    this.facturaService.postAddFacturaOportunidad(factura.idFactura).subscribe(
      resp => {
        console.log(resp);
        this.toastService.success('Factura registrada Exitosamente', 'Success');
        this.montoTotal += factura.monto!;
        console.log(this.montoTotal);
        this.agregarFactura = true;
      }, err => {
        console.error(err);
        this.toastService.error(err.error.mensaje, 'Error');
      });
  }

  deleteFacturaOportunidad(factura: Factura) {
    if (factura.idFactura === undefined) {
      return;
    }
    this.facturaService.deleteAddFacturaOportunidad(factura.idFactura).subscribe(
      resp => {
        console.log(resp);
        this.toastService.success('Factura eliminada Exitosamente', 'Success');
        this.montoTotal -= factura.monto!;
        this.agregarFactura = false;
      }
    );

}

  postInsertarOportunidad() {
  if (!this.empresaSeleccionada || !this.empresaSeleccionada.idEmpresa) {
    // Validar si no se ha seleccionado una empresa o si no se ha obtenido su ID
    // Puedes mostrar un mensaje de error o realizar alguna otra acción apropiada
    Swal.fire('OJO', 'No se ha seleccionado una empresa', 'warning');
    return;
  }
  if (!this.empresaFacturasRegistradas) {
    // No hay facturas agregadas a la empresa, muestra un mensaje de error o realiza alguna otra acción apropiada
    Swal.fire('OJO', 'No se han agregado facturas a la empresa', 'warning');
    return;
  }
  if (this.form.invalid) {
    console.log('se verifico');
    //   // Validar si el formulario es inválido
    //   // Puedes mostrar un mensaje de error o realizar alguna otra acción apropiada
     this.form.markAllAsTouched();

   return;
  }
  // Obtener el ID de la empresa seleccionada
  const idEmpresaSeleccionada = this.empresaSeleccionada.idEmpresa;
  console.log('se incia constante');
  // Crear el objeto de oportunidad de inversión con los demás datos necesarios
  const oportunidadInversion = {
    // campos de la oportunidad de inversión
    idEmpresa: idEmpresaSeleccionada,
    fechaCaducidad: this.objOportunidades.fechaCaducidad,
    rendimiento: this.objOportunidades.rendimiento,
    monto: this.montoTotal,
    tir: this.objOportunidades.tir,
  };
  console.log('se lee todo');
  this.oportunidadesService.postOportunidad(oportunidadInversion).subscribe(
    response => {
      Swal.fire('Registro con exito', response.mensaje, 'success');
      this.form.reset();
      this.clearArrayList();
        this.router.navigate(['/inversiones/list-inversion']);
    
    },
    error => {
      Swal.fire('OJO', 'Se debe agregar facturas para poder registrar una oportunidad', 'warning');
    }
  );
     
}
 
AgregarFacturaCheckbox(e:any, fac:Factura){
  if(e.target.checked){
    this.addFacturaOportunidad(fac)

  }else{
    this.deleteFacturaOportunidad(fac)
  }
}

}
