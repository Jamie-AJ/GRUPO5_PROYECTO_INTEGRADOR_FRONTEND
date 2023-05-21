

//TODO: EXPRESIONES REGULARES
export const nombreApellidoPattern: string = '[a-zA-ZñáéíóúüÁÉÍÓÚÜ ]{3,50}';
//El numero de dni debe contener 8 digitos
export const dniPattern: string = "^[\\d]{8}$";
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
export const datePattern: string = "^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|0[1-2])\0\d{4}$";
//El telefono debe contener 9 digitos iniciar con 9 y cualquier digitos
export const telefonoPattern: string = "^9[\\d]{8}$";
//La contraseña debe ser minimo de 8 caracteres, contar con al menos 1 caracter especial y al menos un numero
export const passwordPattern: string = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z]).{8,}$";

export const cuentaBancariaPattern: string = "^[0-9]{16,20}$";
export const cvvPattern: string ="^[0-9]{3,4}$";