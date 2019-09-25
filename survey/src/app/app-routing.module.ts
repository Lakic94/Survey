import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';

const routes:Routes = [
  {path: '', component:HomeComponent},
  {path: 'signin-oidc', component:HomeComponent},
  {path: 'question', loadChildren: ()=> import('./question/question.module').then(mod=>mod.QuestionModule)},
  
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
