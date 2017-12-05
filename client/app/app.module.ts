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
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { LogoutComponent } from './components/auth/logout/logout.component';

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
    LogoutComponent ],
  imports: [ BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
