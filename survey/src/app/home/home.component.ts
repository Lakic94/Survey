import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { FormsService } from '../shared/forms.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddSurveyDialogComponent } from '../add-survey-dialog/add-survey-dialog.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  public data = [];

  displayedColumns: string[] = ['Title'];
  dataSource = new MatTableDataSource<any>(this.data);



  constructor(private fb: FormBuilder, private sharedService: FormsService, public matDialog: MatDialog) { }


  ngOnInit() {
    this.sharedService.getAll('Survey').subscribe(data => {

      this.dataSource = new MatTableDataSource(data)
      console.log(data)


    });
  }

  openDialog() {
    this.matDialog.open(AddSurveyDialogComponent, {
      width: '50%',
      height: '90%'

    })
  }

  openSurvey(id) {
    console.log(id);
  }

}
