import { Component, ElementRef, HostListener, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Saldo } from 'src/app/interface/saldo.interface';
import { Usuario } from 'src/app/interface/usuario.interface';
import { LoginService } from 'src/app/services/login.service';
import { SaldoService } from 'src/app/services/saldo.service';


interface SideNavToggle{
  screenWidth:number;
  collapse:boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @Output() onToggleSideBar: EventEmitter<SideNavToggle> = new EventEmitter();
  isSideBarCollapse = false;
  // screenWidth = 0;

  isAdministrador = this.login.getUserRole() === 'ADMIN';
  isInversionista = this.login.getUserRole() === 'INVERSIONISTA';

  collapse: boolean = false;
  isIconRotated: boolean = false;
  isDropdownOpen: boolean = false;
  screenWidth = 0;
  isLoggedIn = false;
  public user: Usuario = new Usuario();
  objSaldo:Saldo = {
    idCartera:0,
    saldo:0,
  }
  constructor(private login: LoginService, private router: Router, private saldoService: SaldoService) { }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.closeSidebarIfNeeded(event.target.innerWidth);
  }
    ngOnInit(): void {
  
      this.singIn();
      this.getSaldo();
    }
  private closeSidebarIfNeeded(windowWidth: number) {
    if (windowWidth <= 768) {
      this.isSideBarCollapse = false;
    } else {
      this.isSideBarCollapse = true;
    }
  }

  getSaldo() {
    this.saldoService.getDetallCartera().subscribe(resp => {
      this.objSaldo = resp;
    })
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
  toggleCollapse(){
    this.collapse = !this.collapse;
  }
  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}