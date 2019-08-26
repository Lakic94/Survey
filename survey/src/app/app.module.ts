import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { QuestionModule } from './question/question.module';
import { QuestionComponent } from './question/question.component';
import { DialogComponent } from './dialog/dialog.component';
import { FormsService } from './shared/forms.service';
import { AddSurveyDialogComponent } from './add-survey-dialog/add-survey-dialog.component';
import { HomeService } from './home/home.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogComponent,
    AddSurveyDialogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    QuestionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

  entryComponents: [
    DialogComponent,
    AddSurveyDialogComponent
  ],
  providers: [FormsService,HomeService ,{ provide: MAT_DIALOG_DATA, useValue: [] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
