import { Component,Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interface/usuario.interface';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  @Input() collapse = false;
  @Input() screenWidth= 0;
  
  isLoggedIn = false;
  user!:Usuario;


  constructor(private login:LoginService, private router:Router){}
  ngOnInit(): void {
    this.singIn();
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
