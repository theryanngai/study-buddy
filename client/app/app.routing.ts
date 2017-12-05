import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { QuizCreatorComponent } from './components/quizzes/quiz-creator/quiz-creator.component';
import { QuizCreationResultsComponent} from './components/quizzes/quiz-creator/quiz-creation-results/quiz-creation-results.component';
import { QuizComponent } from './components/quizzes/quiz/quiz.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'quiz/create', component: QuizCreatorComponent },
  { path: 'quiz/create/results', component: QuizCreationResultsComponent },
  { path: 'quiz/:quizId', component: QuizComponent },
  { path: 'search-results', component: SearchResultsComponent },
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
  QuizComponent,
  SearchResultsComponent,
];



