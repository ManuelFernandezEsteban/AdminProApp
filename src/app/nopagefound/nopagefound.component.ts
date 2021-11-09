import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls:['./nopagefound.component.css'],
  styles: [
  ]
})
export class NopagefoundComponent implements OnInit {

  year:number=new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
