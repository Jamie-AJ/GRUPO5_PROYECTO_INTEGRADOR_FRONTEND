import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  title = 'Dashboard';
  currentMonth?: String;
  currentYear?: Number;
  
  public monthNames: String[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  ngOnInit(): void {
    this.monthNames;
    const currentDate = new Date();
    const monthIndex = currentDate.getMonth();
    this.currentMonth = this.monthNames[monthIndex];
    this.currentYear = currentDate.getFullYear();
  }
  
}
