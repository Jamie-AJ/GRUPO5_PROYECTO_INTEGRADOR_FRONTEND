
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, inject } from '@angular/core';
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
  private elementRef = inject(ElementRef);
  isAdministrador = this.authService.getUserRole() === 'ADMIN';
  isInversionista = this.authService.getUserRole() === 'INVERSIONISTA';

  collapse:boolean = false;
  isDropdownOpen: boolean = false;
  screenWidth = 0;
  user!:Usuario;

  @HostListener('window:resize', ['$event',])
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
  

  /**
   * This function toggles the state of a dropdown menu.
   * @param {Event} e - Event object, which represents an event that occurred in the browser, such as a
   * mouse click or a keyboard press.
   */
  toggleDropdown(e:Event) {
    e.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  /**
   * This function toggles the collapse state of a sidebar and emits an event with the updated state.
   */
  toggleCollapse(): void {
    this.collapse = !this.collapse;
    this.onToggleSideBar.emit({ screenWidth: this.screenWidth, collapse: this.collapse });
  }

  /**
   * The function sets the "collapse" property to false and emits an event with the current screen
   * width and collapse status.
   */
  closeCollapse(): void {
    this.collapse = false;
    this.onToggleSideBar.emit({ screenWidth: this.screenWidth, collapse: this.collapse });
  }
}
