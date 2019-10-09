import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { FormsService } from '../shared/forms.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddSurveyDialogComponent } from '../add-survey-dialog/add-survey-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service';
import { TokenService } from '../shared/token.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  data = [];

  displayedColumns: string[] = ['Title','actions'];
  dataSource = new MatTableDataSource<any>(this.data);
  sub: any;
  id: any;
  matDialogRef: MatDialogRef<AddSurveyDialogComponent>;

  filter = {
    userId : this.tokenService.getId()
  }

  constructor(private fb: FormBuilder,
    private sharedService: FormsService,
    public matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private homeService: HomeService,
    private tokenService:TokenService) {
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = params['id'];
    //   console.log(this.id);
    // });
  }


  ngOnInit() {
      this.loadData();
  }

  openDialog() {
    this.matDialogRef = this.matDialog.open(AddSurveyDialogComponent, {
    })
    
    this.matDialogRef.afterClosed().subscribe(a => {
      this.loadData()
    })
  }

  clickOnRow(id) {
    this.homeService.emitRowIdChanged(id);
    this.router.navigateByUrl('/create/' + id);
  }

  loadData() {
    this.sharedService.getByFilter('Survey', this.filter).subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    });
  }
  
  share(id){
    this.router.navigateByUrl('/answer/'+id)
  }

}


