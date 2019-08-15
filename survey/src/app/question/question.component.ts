import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InputQuestionComponent } from './input-question/input-question.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  title = "Title";


 comp = DialogComponent;

  

  constructor(public matDialog:MatDialog) { }

  ngOnInit() {

  }

  openDialog(){
    this.matDialog.open(this.comp,{
      width:'50%',
      height:'90%'
      
    })
  }



}
