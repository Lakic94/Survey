import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { OAuthModule } from 'angular-oauth2-oidc';



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
import { AppInitService } from './shared/app-init.service';
import { AnswersComponent } from './answers/answers.component';

export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => { 
    return appInitService.Init();
  }
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogComponent,
    AddSurveyDialogComponent,
    AnswersComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    QuestionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['http://localhost:8000/api'],
          sendAccessToken: true
      }
  })
  ],

  entryComponents: [
    DialogComponent,
    AddSurveyDialogComponent
  ],
  providers: [
    FormsService,
    HomeService,
    { provide: MAT_DIALOG_DATA, useValue: [] },
    AppInitService, {
      provide: APP_INITIALIZER,
      useFactory: initializeApp1,
      multi: true,
      deps: [AppInitService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
