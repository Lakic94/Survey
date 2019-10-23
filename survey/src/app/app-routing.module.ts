import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { AnswersComponent } from './answers/answers.component';
import { PendingChangesGuard } from './can-deactivate/pending-changes.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'answer/:id', component: AnswersComponent },
  {
    path: 'create/:id',
    component: QuestionComponent,
    canDeactivate: [PendingChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
