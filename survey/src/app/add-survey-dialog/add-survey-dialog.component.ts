import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsService } from '../shared/forms.service';

@Component({
  selector: 'app-add-survey-dialog',
  templateUrl: './add-survey-dialog.component.html',
  styleUrls: ['./add-survey-dialog.component.css']
})
export class AddSurveyDialogComponent implements OnInit {

  titleForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private sharedService: FormsService) {
    
  }

  ngOnInit() {
    this.titleForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })

  }

  saveSurvey() {

    this.sharedService.add("Survey", this.titleForm.value).subscribe(e => {
      console.log(this.titleForm)
    });

  }

  

}
