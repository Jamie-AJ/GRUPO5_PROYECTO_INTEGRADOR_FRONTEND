
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';


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

  collapse = false;
  screenWidth = 0;


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
