import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MetadataService } from '../shared/metadata.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddSurveyDialogComponent } from '../add-survey-dialog/add-survey-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tableData = [];

  displayedColumns: string[] = ['Title', 'actions'];
  dataSource = new MatTableDataSource<any>(this.tableData);
  sub: any;
  id: any;
  matDialogRef: MatDialogRef<AddSurveyDialogComponent>;

  filter = {
    userId: this.tokenService.getId()
  };

  constructor(
    private metaService: MetadataService,
    public matDialog: MatDialog,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  openDialog() {
    this.matDialogRef = this.matDialog.open(AddSurveyDialogComponent, {
      width: '400px',
      maxHeight: '1000px'
    });

    this.matDialogRef.afterClosed().subscribe(a => {
      this.loadData();
    });
  }

  loadData() {
    this.metaService.getByFilter('Survey', this.filter).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  navigateToAnswer(id) {
    this.router.navigateByUrl('/answer/' + id);
  }

  navigateToQuestion(id) {
    this.router.navigateByUrl('/create/' + id);
  }
}
