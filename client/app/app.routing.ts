import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent} from "./components/auth/logout/logout.component";
import { RegisterComponent } from './components/register/register.component';
import { QuizCreatorComponent } from './components/quizzes/quiz-creator/quiz-creator.component';
import { QuizCreationResultsComponent} from './components/quizzes/quiz-creator/quiz-creation-results/quiz-creation-results.component';
import { QuizComponent } from './components/quizzes/quiz/quiz.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AccessGuard } from './services/access-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard',
    component: DashboardComponent,
    data: { requiresLogin: true },
    canActivate: [ AccessGuard ] },
  { path: 'register',
    component: RegisterComponent,
    data: { requiresLogin: false },
    canActivate: [ AccessGuard ] },
  { path: 'login',
    component: LoginComponent,
    data: { requiresLogin: false },
    canActivate: [ AccessGuard ] },
  { path: 'logout',
    component: LogoutComponent,
    data: { requiresLogin: true },
    canActivate: [ AccessGuard ] },
  { path: 'user-profile/:userId',
    component: UserProfileComponent,
    data: { requiresLogin: true },
    canActivate: [ AccessGuard ] },
  { path: 'quiz/create',
    component: QuizCreatorComponent,
    data: { requiresLogin: true },
    canActivate: [ AccessGuard ] },
  { path: 'quiz/create/results',
    component: QuizCreationResultsComponent,
    data: { requiresLogin: true },
    canActivate: [ AccessGuard ]},
  { path: 'quiz/:quizId',
    component: QuizComponent,
    data: { requiresLogin: true },
    canActivate: [ AccessGuard ] },
  { path: 'search-results',
    component: SearchResultsComponent,
    data: { requiresLogin: true },
    canActivate: [ AccessGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [
  DashboardComponent,
  LoginComponent,
  LogoutComponent,
  RegisterComponent,
  QuizCreatorComponent,
  QuizCreationResultsComponent,
  QuizComponent,
  SearchResultsComponent,
];



