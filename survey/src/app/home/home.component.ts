import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { FormsService } from '../shared/forms.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddSurveyDialogComponent } from '../add-survey-dialog/add-survey-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  public data = [];

  displayedColumns: string[] = ['Title'];
  dataSource = new MatTableDataSource<any>(this.data);
  sub: any;
  id: any;

  constructor(private fb: FormBuilder,
    private sharedService: FormsService,
    public matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
      // this.sub = this.route.params.subscribe(params => {
      //   this.id = params['id'];
      //   console.log(this.id);
      // });
  }


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

  

  clickOnRow(id) {
    console.log(id);
    this.router.navigateByUrl('/create/' + id);
  }

}
