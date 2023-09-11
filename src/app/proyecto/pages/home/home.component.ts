import { Component, ElementRef, HostListener, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Saldo } from 'src/app/interface/saldo.interface';
import { Usuario } from 'src/app/interface/usuario.interface';
import { LoginService } from 'src/app/services/login.service';
import { SaldoService } from 'src/app/services/saldo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isSideBarCollapse = false;
  isAdministrador = this.login.getUserRole() === 'ADMIN';
  isInversionista = this.login.getUserRole() === 'INVERSIONISTA';
  darkMode = false;
  collapse: boolean = false;
  isDropdownOpen: boolean = false;
  screenWidth = 0;
  isLoggedIn = false;
  public user: Usuario = new Usuario();
  objSaldo:Saldo = {
    idCartera:0,
    saldo:0,
  }
  constructor(private login: LoginService, private router: Router, private saldoService: SaldoService) { }

    ngOnInit(): void {
      this.singIn();
      this.getSaldo();
    }
  
  darkTheme() {
    this.darkMode = !this.darkMode;
  }
  getSaldo() {
    this.saldoService.getDetallCartera().subscribe(resp => {
      this.objSaldo = resp;
    })
  }
  concatNameComplete() {
    return this.user.nombre + ' ' + this.user.apellidoPa + ' ' + this.user.apellidoMa;
  }
  singIn() {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )
  }
  public logout() {
    this.login.logout();
    this.router.navigate(['/auth/login']);
  }
  closeDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  toggleCollapse(){
    this.collapse = !this.collapse;
  }
  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  closeSidebar() {
    this.collapse = false;
  }

}