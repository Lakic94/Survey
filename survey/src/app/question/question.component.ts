import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InputQuestionComponent } from './input-question/input-question.component';
import { DialogComponent } from '../dialog/dialog.component';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  title = "Title";
  private _rowId: any;
  


 comp = DialogComponent;

  

  constructor(
    public matDialog:MatDialog,
    private homeService: HomeService,
    ) {
      
      this.homeService.rowIdChanged.subscribe(result => {
        this._rowId = result;
      });
      
    }

  ngOnInit() {
    console.log(this._rowId)
   }

  openDialog(){
    this.matDialog.open(this.comp,{
      width:'50%',
      height:'70%',
      data: this._rowId
    })

    
  }



}
