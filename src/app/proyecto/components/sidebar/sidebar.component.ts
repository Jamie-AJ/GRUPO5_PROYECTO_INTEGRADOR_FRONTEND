
import { Component, EventEmitter, HostListener, Input, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Role } from 'src/app/interface/role.interface';
import { Usuario } from 'src/app/interface/usuario.interface';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';


interface SideNavToggle {
  screenWidth: number;
  collapse: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  @Output() onToggleSideBar: EventEmitter<SideNavToggle> = new EventEmitter();

  private authService = inject(LoginService);
  isAdministrador = this.authService.getUserRole() === 'ADMIN';
  isInversionista = this.authService.getUserRole() === 'INVERSIONISTA';

  collapse = false;
  screenWidth = 0;
  user!:Usuario;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapse = false;
      this.onToggleSideBar.emit({ screenWidth: this.screenWidth, collapse: this.collapse });
    }
  }
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

  }

  toggleCollapse(): void {
    this.collapse = !this.collapse;
    this.onToggleSideBar.emit({ screenWidth: this.screenWidth, collapse: this.collapse });
  }

  closeCollapse(): void {
    this.collapse = false;
    this.onToggleSideBar.emit({ screenWidth: this.screenWidth, collapse: this.collapse });
  }
}
