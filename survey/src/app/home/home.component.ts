import { Component, OnInit } from '@angular/core';

let survey = [
  {name:'Popis'},
  {name:'Konj'},
  {name:'Nesto'}
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  dataSource = survey;

  constructor() { }

  ngOnInit() {
  }

}
