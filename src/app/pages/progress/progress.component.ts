import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls:['./progress.component.css'],
  styles: [
  ]
})
export class ProgressComponent implements OnInit {

  progreso1:number=25;
  progreso2:number=35;
  class="btn-info";
  
  getPorcentaje1(){
    
    return `${this.progreso1}%`;
  }

  getPorcentaje2(){
    return `${this.progreso2}%`;
  }

  

  constructor() { }

  ngOnInit(): void {
    
  }

}
