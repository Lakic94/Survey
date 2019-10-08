import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { AnswersComponent } from './answers/answers.component';

const routes:Routes = [
  {path: '', component:HomeComponent},
  {path:'answer/:id', component:AnswersComponent},
  //{path: 'question', loadChildren: ()=> import('./question/question.module').then(mod=>mod.QuestionModule)},
  
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
