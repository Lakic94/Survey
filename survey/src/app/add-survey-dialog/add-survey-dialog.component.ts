import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsService } from '../shared/forms.service';
import { formModel } from '../shared/form.model';
import { MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-add-survey-dialog',
  templateUrl: './add-survey-dialog.component.html',
  styleUrls: ['./add-survey-dialog.component.css']
})
export class AddSurveyDialogComponent implements OnInit {
  titleForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: FormsService,
    private dialogRef: MatDialogRef<AddSurveyDialogComponent>,
    private tokenService: TokenService
  ) {

  }


  ngOnInit() {
    this.titleForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    })

  }

  saveSurvey() {
    let form = new formModel(this.titleForm.value);
    form.userId = this.tokenService.getClaims().sub;
    this.sharedService.add("Survey", form).subscribe(e => {
    });
    this.dialogRef.close()

  }
}
