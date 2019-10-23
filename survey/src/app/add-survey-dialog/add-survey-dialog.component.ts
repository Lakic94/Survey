import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MetadataService } from '../shared/metadata.service';
import { formModel } from '../shared/model/form.model';
import { MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-add-survey-dialog',
  templateUrl: './add-survey-dialog.component.html',
  styleUrls: ['./add-survey-dialog.component.scss']
})
export class AddSurveyDialogComponent implements OnInit {
  titleForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private metaService: MetadataService,
    private dialogRef: MatDialogRef<AddSurveyDialogComponent>,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.titleForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  saveSurvey() {
    const form = new formModel(this.titleForm.value);
    form.userId = this.tokenService.getClaims().sub;
    this.metaService.add('Survey', form).subscribe(e => {});
    this.dialogRef.close();
  }
}
