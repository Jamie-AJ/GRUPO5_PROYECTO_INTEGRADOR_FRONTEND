import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresas } from 'src/app/interface/empresas.interface';
import { Factura } from 'src/app/interface/factura.interface';
import { Oportunidades } from 'src/app/interface/oportunidades.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { FacturaService } from 'src/app/services/factura.service';
import { OportunidadesService } from 'src/app/services/oportunidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-oportunities',
  templateUrl: './add-oportunities.component.html',
  styleUrls: ['./add-oportunities.component.css']
})
export class AddOportunitiesComponent {

  public objOportunidades:Oportunidades = new Oportunidades();
  public factura:Factura = new Factura();
  public empresas:Empresas[] = [];
  public facturaList:Factura[] = [];
  public mostrarAlerta: boolean = false;
  public seEncontraronResultados: boolean = false;
  public isLoading: boolean = false;
  empresaSeleccionada:any;
  private router = inject(Router);


  constructor( private empresasServices:EmpresasService,
    private facturaService:FacturaService, 
    private oportunidadesService: OportunidadesService,
    private toastService:ToastrService) { }

  filterEmpresas(keyword: String): void{
    this.isLoading = true;
    this.empresasServices.filterEmpresas(keyword).subscribe(empresas =>{
     this.empresas = empresas;
     this.isLoading = false;
     this.seEncontraronResultados = this.empresas.length > 0;
    },err =>{
      console.log(err);
      this.mostrarAlerta = true;
    });
  }
  //RECUPERA LAS FACTURAS DE LA EMPRESA SELECCIONADA
  //NO ITERA LAS FACTURAS DE LA EMPRESA SELECCIONADA EN EL HTML
  addFacturaporEmpresas(empresa:Empresas){
    if(empresa.idEmpresa === undefined){
      return;
    }
    this.empresaSeleccionada = empresa;
    this.facturaService.getFacturasXEmpresa(empresa.idEmpresa).subscribe((response: any) =>{
      const facturas = response.facturas;
      console.log(facturas);
      this.facturaList = facturas;
    },(error) =>{
      console.error(error);
    });
  }
  addFacturaOportunidad(factura:Factura){
    if(factura.idFactura=== undefined){
      return;
    }
    this.facturaService.postAddFacturaOportunidad(factura.idFactura).subscribe(
      resp =>{
        console.log(resp);
       this.toastService.success('Factura registrada Exitosamente', 'Success');
      },err =>{
        console.error(err);
        this.toastService.error(err.error.mensaje, 'Error');
      });
  }
  deleteFacturaOportunidad(factura:Factura){
    if(factura.idFactura=== undefined){
      return;
    }
    this.facturaService.deleteAddFacturaOportunidad(factura.idFactura).subscribe(
      resp =>{
        console.log(resp);
        this.toastService.success('Factura eliminada Exitosamente', 'Success');
      }
    );

  }
  postInsertarOportunidad(){
    if (!this.empresaSeleccionada || !this.empresaSeleccionada.idEmpresa) { 
      // Validar si no se ha seleccionado una empresa o si no se ha obtenido su ID
      // Puedes mostrar un mensaje de error o realizar alguna otra acción apropiada
      return;
    }
    // Obtener el ID de la empresa seleccionada
    const idEmpresaSeleccionada = this.empresaSeleccionada.idEmpresa;
  
    // Crear el objeto de oportunidad de inversión con los demás datos necesarios
    const oportunidadInversion = {
      // campos de la oportunidad de inversión
      idEmpresa: idEmpresaSeleccionada,
      fechaCaducidad: this.objOportunidades.fechaCaducidad, 
      rendimiento: this.objOportunidades.rendimiento,
      monto: this.objOportunidades.monto,
      tir:this.objOportunidades.tir,
    };
    this.oportunidadesService.postOportunidad(oportunidadInversion).subscribe(
      response =>{
        Swal.fire('Registro con exito', response.mensaje, 'success');
        this.router.navigate(['/inversiones/list-inversion']);
      },
      error =>{
        console.error(error);
      }
    );
  }
}
