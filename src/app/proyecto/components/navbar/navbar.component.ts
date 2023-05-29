import { Component,ElementRef,HostListener,Input, OnInit, inject} from '@angular/core';
import { Router } from '@angular/router';
import { Saldo } from 'src/app/interface/saldo.interface';
import { Usuario } from 'src/app/interface/usuario.interface';
import { LoginService } from 'src/app/services/login.service';
import { SaldoService } from 'src/app/services/saldo.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {


  private saldoService = inject(SaldoService);
  private authService = inject(LoginService);

  @Input() collapse = false;
  @Input() screenWidth= 0;
  isInversionista = this.authService.getUserRole() === 'INVERSIONISTA';
  isDropdownOpen: boolean = false;
  isLoggedIn = false;
  user!:Usuario;
  objSaldo:Saldo = {
    idCartera:0,
    saldo:0,
  }
  constructor(private login:LoginService, private router:Router,private elementRef: ElementRef){}
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
  ngOnInit(): void {
    this.singIn();
    this.getSaldo();
  }
 
  getSaldo(){
    this.saldoService.getDetallCartera().subscribe(resp =>{
      this.objSaldo = resp;
    })
  }

  singIn(){
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )
  }
  public logout(){
    this.login.logout();
    this.router.navigate(['/auth/login']);
  }
  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  getHeadClass():string{ 
    let styleClass:string='';
    if(this.collapse && this.screenWidth > 768){
      styleClass ='head-collapsed'
    }else{
      styleClass ='head-expanded'
    }
    return styleClass;
  }
  
}
