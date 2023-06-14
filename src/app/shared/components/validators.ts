import { AbstractControl, Form, FormControl, ValidationErrors } from "@angular/forms";


//TODO: EXPRESIONES REGULARES
export const stringPattern: string = "^(?:[A-ZÁÉÍÓÚÜÑ]'?|[A-ZÁÉÍÓÚÜÑ])(?:[aA-zZáéíóúüñÁÉÍÓÚÜÑ](?!.*[A-ZÁÉÍÓÚÜÑ]{2})(?:'?[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+)*(?: [A-Za-záéíóúüñÁÉÍÓÚÜÑ]+(?:'?[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+)*)*)+$";
export const razonPattern: string = "^(?:[A-ZÁÉÍÓÚÜÑ]'?|[A-ZÁÉÍÓÚÜÑ])(?:[aA-zZáéíóúüñÁÉÍÓÚÜÑ](?:'?[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+)*(?: [A-Za-záéíóúüñÁÉÍÓÚÜÑ]+(?:'?[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+)*)*|\.?[A-ZÁÉÍÓÚÜÑ][A-Za-záéíóúüñÁÉÍÓÚÜÑ]*)+$";
    //El numero de dni debe contener 8 digitos
export const dniPattern: string = "^[\\d]{8}$";
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
export const datePattern: string = "^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|0[1-2])\0\d{4}$";
//El telefono debe contener 9 digitos iniciar con 9 y cualquier digitos
export const telefonoPattern: string = "^9[\\d]{8}$";
//La contraseña debe ser minimo de 8 caracteres, contar con al menos 1 caracter especial y al menos un numero
export const passwordPattern: string = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z]).{8,}$";

// export const cuentaBancariaPattern: string = "^[0-9]{16,20}$";
export const cvvPattern: string ="^[0-9]{3,4}$";
export const rucPattern: string ="^20[\\d]{9}$";

//El precio no debe ser negativo
export const precioPattern: string = "^(?!-)[0-9]+(?:\\.[0-9]+)?$"; 


//TODO: VALIDACIONES PERSONALIZADAS
export const validarNumerosNegativos = (control: FormControl): ValidationErrors | null =>{
    const value:number = control.value;
    if (value < 0) {
        return { negativeNumber: true };
    }
    return null;
}
//TODO: VALDATE CREDIT CARD
export const validarTarjetaCredito = (control: FormControl): ValidationErrors | null => {
    const cardNumber:any = document.getElementById('nroCuenta');
    cardNumber?.addEventListener('keyup', (e:any) => { 
        let valor = e.target.value;
        cardNumber.value =
        //eliminar espacios en blanco
        valor.replace(/\s/g, '')
         //eliminar letras
        .replace(/\D/g, '')
        //poner espacio cada 4 numeros
        .replace(/([0-9]{4})/g, '$1 ')
        //eliminar el ultimo espaciado    
        .trim();
    });
    
    return null;
}