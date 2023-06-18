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
  // isSideBarCollapse = false;
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
  constructor(private login:LoginService, private router:Router,private saldoService:SaldoService){}
  // @HostListener('window:resize', ['$event',])
  // onResize(event: any): void {
  //   this.screenWidth = window.innerWidth;
  //   if (this.screenWidth <= 768) {
  //     this.collapse = false;
  //     this.onToggleSideBar.emit({ screenWidth: this.screenWidth, collapse: this.collapse });
  //   } 
  // ngOnInit(): void {
  //   this.screenWidth = window.innerWidth;

  // }
  ngOnInit(): void {
    this.singIn();
    this.getSaldo();
    
  }
  

  rotateIcon() {
    this.isIconRotated = !this.isIconRotated;
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
  /**
   * This function toggles the state of a dropdown menu.
   * @param {Event} e - Event object, which represents an event that occurred in the browser, such as a
   * mouse click or a keyboard press.
   */
  // toggleDropdown(e:Event) {
  //   e.preventDefault();
  //   this.isDropdownOpen = !this.isDropdownOpen;
  // }
  /**
   * This function toggles the collapse state of a sidebar and emits an event with the updated state.
   */
  // toggleCollapse(): void {
  //   this.collapse = !this.collapse;
  //   this.onToggleSideBar.emit({ screenWidth: this.screenWidth, collapse: this.collapse });
  // }

  /**
   * The function sets the "collapse" property to false and emits an event with the current screen
   * width and collapse status.
   */
  // closeCollapse(): void {
  //   this.collapse = false;
  //   this.onToggleSideBar.emit({ screenWidth: this.screenWidth, collapse: this.collapse });
  // }

  // onToggleSideBar(data:SideNavToggle):void{
  //   this.screenWidth = data.screenWidth;
  //   this.isSideBarCollapse = data.collapse;
  // }


}