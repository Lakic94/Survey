import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './shared/app-material.module';

import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { MetadataService } from './shared/metadata.service';
import { AddSurveyDialogComponent } from './add-survey-dialog/add-survey-dialog.component';
import { AppInitService } from './shared/app-init.service';
import { AnswersComponent } from './answers/answers.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { InputQuestionComponent } from './question-types/input-question/input-question.component';
import { SelectQuestionComponent } from './question-types/select-question/select-question.component';
import { TextQuestionComponent } from './question-types/text-question/text-question.component';
import { CheckboxQuestionComponent } from './question-types/checkbox-question/checkbox-question.component';
import { RadioQuestionComponent } from './question-types/radio-question/radio-question.component';
import { HeaderComponent } from './header/header.component';
import { PendingChangesGuard } from './can-deactivate/pending-changes.guard';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddQuestionDialogComponent,
    AddSurveyDialogComponent,
    AnswersComponent,
    QuestionComponent,
    InputQuestionComponent,
    SelectQuestionComponent,
    TextQuestionComponent,
    CheckboxQuestionComponent,
    RadioQuestionComponent,
    HeaderComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://10.1.0.69:55002/api'],
        sendAccessToken: true
      }
    })
  ],

  entryComponents: [AddQuestionDialogComponent, AddSurveyDialogComponent, ConfirmDialogComponent],
  providers: [
    MetadataService,
    { provide: MAT_DIALOG_DATA, useValue: [] },
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp1,
      multi: true,
      deps: [AppInitService]
    },
    PendingChangesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  };
}
