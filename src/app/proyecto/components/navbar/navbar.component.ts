import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  user:any = null;


  constructor(public login:LoginService){}
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
    window.location.reload();
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
