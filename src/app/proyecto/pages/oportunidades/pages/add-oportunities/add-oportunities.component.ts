import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresas } from 'src/app/interface/empresas.interface';
import { Factura } from 'src/app/interface/factura.interface';
import { Oportunidades } from 'src/app/interface/oportunidades.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { FacturaService } from 'src/app/services/factura.service';
import { OportunidadesService } from 'src/app/services/oportunidades.service';
import Swal from 'sweetalert2';
import * as customValidators from 'src/app/shared/components/validators';

import { ModalService } from 'src/app/services/modal.service';



@Component({
  selector: 'app-add-oportunities',
  templateUrl: './add-oportunities.component.html',
  styleUrls: ['./add-oportunities.component.css']
})
export class AddOportunitiesComponent implements OnInit {

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
  @HostListener('document:keydown', ['$event']) 
  onKeydown(event: KeyboardEvent) {
    const eventKey = event.key;
    if (eventKey === 'enter') {
      event.preventDefault();
    }
  }
  
  ngOnInit(): void {
    this.clearArrayList();
    this.modalService.showModal$.subscribe(show => {
      this.display = show;
    });
  }


  clearArrayList() {
    this.oportunidadesService.getRefrescarFacturas().subscribe((response: any) => {
      const facturas = response.facturas;
      this.facturaList = facturas;
    });
  }


  filterEmpresas(keyword: String): void {
    if (keyword.trim() === '') {
      this.empresas = [];
      this.seEncontraronResultados = false;
      return;
    }
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
    this.router.navigate(['/dashboard/inversion/list-inversion']);
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
        this.router.navigate(['/dashboard/inversion/list-inversion']);

      },
      error => {
        Swal.fire('OJO', 'Se debe agregar facturas para poder registrar una oportunidad', 'warning');
      }
    );

  }

  AgregarFacturaCheckbox(e: any, fac: Factura) {
    if (e.target.checked) {
      this.addFacturaOportunidad(fac)

    } else {
      this.deleteFacturaOportunidad(fac)
    }
  }

}
