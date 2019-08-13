import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  arr=[
    {name:'input'},
    {name:'checkbox'},
    {name:'select'},
    {name:'radio'},
    {name:'sadas'},
    {name:'sadas'},
    {name:'sadas'},
    {name:'sadas'},
    {name:'sadas'}
    
  ]

}
