import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InputQuestionComponent } from './input-question/input-question.component';
import { DialogComponent } from '../dialog/dialog.component';
import { HomeService } from '../home/home.service';
import { FormsService } from '../shared/forms.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { formModel } from '../shared/form.model';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  private _rowId: any;

  survey: formModel;

  form: FormGroup;

  questions: any = [];

  constructor(
    public matDialog: MatDialog,
    private homeService: HomeService,
    private sharedService: FormsService
  ) {

    this.homeService.rowIdChanged.subscribe(result => {
      this._rowId = result;
    });


  }

  ngOnInit() {
    this.getQuestions();


  }

  openDialog() {

    this.matDialog.open(DialogComponent, {
      width: '50%',
      height: '70%',
      data: this._rowId
    })


  }

  getQuestions() {
    return this.sharedService.getById('Survey', this._rowId).subscribe(e => {
      this.survey = e;
      console.log(this.survey)
      if (e.questions === undefined) {
        return;
      }
      else {
        for (let i of e.questions) {
          this.questions.push(i)
        }

      }

      this.form = this.homeService.toFormGroup(this.questions);

      console.log(this.form)

    })



  }

  onSubmit() {

    console.log(this.form)

    let form = this.form.value

    let arr = this.survey.questions

    // for(let i = 0;i < arr.length;i++){
    //   for(let p in q){
    //     if(Array.isArray(p)){
    //       console.log("jeste")
    //     }
    //     if(arr[i].title === p){
    //       arr[i].answers.push(q[p])
    //       delete q[p]
    //       break;
    //     }
    //     arr.find(function(i))
    //   }


    // }

    // if( Array.isArray(t)){
    //   console.log("yey");
    // }
    // if( q  ){
    //   console.log("yey");
    // }

    for (let i = 0; i < arr.length; i++) {
      const questionElement = arr[i].title;

      for (let n = 0; n < Object.keys(form).length; n++) {
        const formElement = Object.keys(form)[n];

        if (Array.isArray(formElement)) {
          for (let j = 0; j < formElement.length; j++) {
            const element = formElement[j];
            if (element) {
              console.log(element);
            }
          }
        }

        if (questionElement === formElement) {


        }
      }
    }


    delete this.survey._id

    // console.log(this.survey.questions)

    //this.sharedService.update("Survey", this._rowId,this.survey).subscribe()

  }

}