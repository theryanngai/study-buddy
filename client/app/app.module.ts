import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app.routing';
import { QuizCreatorComponent } from './components/quizzes/quiz-creator/quiz-creator.component';
import { QuestionCreatorComponent } from './components/quizzes/quiz-creator/question-creator/question-creator.component';
import { QuizCreationResultsComponent } from './components/quizzes/quiz-creator/quiz-creation-results/quiz-creation-results.component';
import { AnswerCreatorComponent } from './components/quizzes/quiz-creator/question-creator/answer-creator/answer-creator.component';
import { QuizComponent } from './components/quizzes/quiz/quiz.component';
import { QuestionComponent } from './components/quizzes/quiz/question/question.component';
import { AnswerComponent } from './components/quizzes/quiz/question/answer/answer.component';
import { SearchBarComponent } from './components/quiz-search/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/quiz-search/search-results/search-results.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { AccessGuard } from './services/access-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FriendsComponent } from './components/user-profile/friends/friends.component';
import { SharedSessionsService } from './services/sessions.service';
import { QuizScoresComponent } from './components/quizzes/quiz/quiz-scores/quiz-scores.component';
import { UserQuizzesComponent } from './components/user-profile/user-quizzes/user-quizzes.component';
import { QuizRaterComponent } from './components/quizzes/quiz/quiz-rater/quiz-rater.component';

@NgModule({
  declarations: [ AppComponent, routingComponents,
    QuizCreatorComponent,
    QuestionCreatorComponent,
    QuizCreationResultsComponent,
    AnswerCreatorComponent,
    QuizComponent,
    QuestionComponent,
    AnswerComponent,
    SearchBarComponent,
    SearchResultsComponent,
    LogoutComponent,
    UserProfileComponent,
    FriendsComponent,
    QuizScoresComponent,
    UserQuizzesComponent,
    QuizRaterComponent],
  imports: [ BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule ],
  providers: [ AccessGuard, AuthenticationService, SharedSessionsService ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
