import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { QuizCreatorComponent } from './components/quizzes/quiz-creator/quiz-creator.component';
import { QuizCreationResultsComponent} from './components/quizzes/quiz-creation-results/quiz-creation-results.component';

const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'quiz/create', component: QuizCreatorComponent },
  { path: 'quiz/create/results', component: QuizCreationResultsComponent ,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [
  DashboardComponent,
  LoginComponent,
  RegisterComponent,
  QuizCreatorComponent,
  QuizCreationResultsComponent,
];



