import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionRoutingModule } from './question-routing.module';
import { InputQuestionComponent } from './input-question/input-question.component';
import { CheckboxQuestionComponent } from './checkbox-question/checkbox-question.component';
import { SelectQuestionComponent } from './select-question/select-question.component';
import { RadioButtonQuestionComponent } from './radio-button-question/radio-button-question.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { QuestionComponent } from './question.component';
import {ReactiveFormsModule } from '@angular/forms';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    InputQuestionComponent,
    InputQuestionComponent,
    CheckboxQuestionComponent,
    RadioButtonQuestionComponent,
    SelectQuestionComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
    
  ],
  providers:[
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ]
})
export class QuestionModule { }
