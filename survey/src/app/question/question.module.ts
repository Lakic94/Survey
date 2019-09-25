import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionRoutingModule } from './question-routing.module';
import { AppMaterialModule } from '../app-material/app-material.module';
import { QuestionComponent } from './question.component';
import {ReactiveFormsModule } from '@angular/forms';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';

@NgModule({
  declarations: [
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
