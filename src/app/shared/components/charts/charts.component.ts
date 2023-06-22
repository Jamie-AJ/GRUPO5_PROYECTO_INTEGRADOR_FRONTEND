import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { Transaccion } from 'src/app/interface/transaccion.interface';
import { DateService } from 'src/app/services/date.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
Chart.register(...registerables)  ;



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(private transactionService:TransaccionService, private meses:DateService) { }
  public transaccionList: Transaccion[] = [];

  chartdata: any;
  labeldata:any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];
  
  ngOnInit(): void {
    this.getListarTransacciones() 
  }

  renderChart(labeldata:any, maindata:any) {
    
    const myChart = new Chart("piechart", {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: '# of Votes',
          data: maindata,
          borderWidth: 1,
          backgroundColor: [
            'rgb(67, 76, 230)',
          ],
          borderColor: [
            'rgb(67, 76, 230)'
          ],
          borderRadius: 10,
          
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getListarTransacciones() {
    this.transactionService.getTransaction().subscribe(resp => { 
      this.chartdata = resp;
      if (this.chartdata != null) {
        for (let i = 0; i < this.chartdata.length; i++) {
          this.labeldata.push(this.chartdata[i].fecha.substring(0, 8));
          this.realdata.push(this.chartdata[i].monto);
        }
        this.renderChart(this.labeldata, this.realdata);
      }
    });
   }
}
