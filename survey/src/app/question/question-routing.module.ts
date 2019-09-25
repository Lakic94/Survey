import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'create/:id', component: QuestionComponent,
  // children:[
  //   {path:'input', component: InputQuestionComponent},
  //   {path:'select', component: SelectQuestionComponent}]
}
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
