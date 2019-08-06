import { Component, OnInit } from '@angular/core';

let survey = [
  {name:'Item'},
  {name:'Item'},
  {name:'Item'}
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
