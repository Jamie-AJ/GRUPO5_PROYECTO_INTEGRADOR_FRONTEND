import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Empresas } from 'src/app/interface/empresas.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import Swal from 'sweetalert2';
import { rucPattern, telefonoPattern } from '../../../../../shared/components/validators';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {
  title:string ='Agregar empresa'
  empresas:Empresas[] = [];

  constructor(private empresasService:EmpresasService,private builder:FormBuilder) { }

  form:FormGroup = this.builder.group({
    nomEmpresa:['',[Validators.required,Validators.minLength(3)]],
    ruc:['',[Validators.required,Validators.pattern(rucPattern)]],
    razonSocial:['',[Validators.required,Validators.minLength(3)]],
    nomRepresentante:['',[Validators.required]],
    fechaDeInicioActv:['',[Validators.required]],
    direccion:['',[Validators.required]],
    telefono:['',[Validators.required,Validators.pattern(telefonoPattern)]],
    correo:['',[Validators.required]],
    sector:['',[Validators.required]],
  })
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
  //REGISTRAR EMPRESA
  postEmpresas(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.empresasService.postEmpresas(this.form.value).subscribe(resp=>{
      Swal.fire('Empresa registrada', resp.mensaje , 'success');
      this.empresas = resp;
      this.form.reset();
    })
  }
}
