import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputQuestionComponent } from './input-question/input-question.component';
import { SelectQuestionComponent } from './select-question/select-question.component';
import { RadioButtonQuestionComponent } from './radio-button-question/radio-button-question.component';
import { CheckboxQuestionComponent } from './checkbox-question/checkbox-question.component';
import { QuestionComponent } from './question.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: QuestionComponent,
  children:[
    {path:'input', component: InputQuestionComponent},
    {path:'select', component: SelectQuestionComponent}
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class QuestionRoutingModule { }
