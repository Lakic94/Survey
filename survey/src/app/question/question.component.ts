import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HomeService } from '../home/home.service';
import { FormsService } from '../shared/forms.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { formModel } from '../shared/form.model';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  


  matDialogRef: MatDialogRef<DialogComponent>;

  private _rowId: any;

  survey: formModel;

  form: FormGroup;

  questions: any = [];

  title:string;

  desc:string;

  currentSurvey: any;

  answer = {
    userId: '',
    answer: []
  }

  

  constructor(
    public matDialog: MatDialog,
    private homeService: HomeService,
    private sharedService: FormsService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tokenService:TokenService
  ) {

    this.homeService.rowIdChanged.subscribe(result => {
      this._rowId = result;
    });


  }

  ngOnInit() {
    this._rowId = this.route.snapshot.paramMap.get('id');
    this.form = this._formBuilder.group({})
    this.getQuestions();


  }

  openDialog() {

     this.matDialogRef = this.matDialog.open(DialogComponent, {
      width: '30%',
      height: '70%',
      data: this._rowId
    })

    this.matDialogRef.afterClosed().subscribe(a=>{
     this.getQuestions()
   })

    


  }

  getQuestions() {
    this.questions = []
    this.form.reset()
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
 
      console.log(this.questions)
      console.log(this.form)

    })



  }

  onSubmit() {

    let formValues = this.form.value

    let arrOfQuestions = this.survey.questions


    for (let i = 0; i < arrOfQuestions.length; i++) {

      for (let fValue in formValues) {

        if (arrOfQuestions[i].title === fValue) {
          console.log(arrOfQuestions[i].title + ' '+ fValue)

          const answerObj = Object.create(this.answer)

          if (Array.isArray(formValues[fValue])) {
           

            let values = (Object.values(formValues[fValue]))

            let checkboxAnswers = []

            for (let j = 0; j < values.length; j++) {
              if (values[j] === true) {
                
                console.log(arrOfQuestions[i].options[j])
                checkboxAnswers.push(arrOfQuestions[i].options[j])
    
              }
              
            }

            console.log(this.tokenService.getId())

            answerObj.userId = this.tokenService.getId();
            answerObj.answer = checkboxAnswers;

            console.log(checkboxAnswers)
            this.survey.questions[i].answers.push(answerObj)
            console.log(this.survey.questions[i].answers)
          }

          else {

            answerObj.userId = this.tokenService.getId();
            answerObj.answer = formValues[fValue]
            this.survey.questions[i].answers.push(answerObj)
            console.log(formValues)
            break;

          }
        }

      } 

     


    }

    console.log(arrOfQuestions)

    delete this.survey._id

    this.sharedService.update("Survey", this._rowId, this.survey).subscribe()

  }

  validateControl(controlName){
    if(this.form.controls[controlName].invalid && this.form.controls[controlName].touched){
      return true;
    }
    else
      false;

  }

  emitId(event){
    this.survey.questions.splice(event,1)
    delete this.survey._id
    this.sharedService.update("Survey", this._rowId, this.survey
    ).subscribe(e => this.getQuestions())
  }
}