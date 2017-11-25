import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app.routing';
import { QuizCreatorComponent } from './components/quizzes/quiz-creator/quiz-creator.component';
import { QuestionCreatorComponent } from './components/quizzes/question-creator/question-creator.component';

@NgModule({
  declarations: [ AppComponent, routingComponents, QuizCreatorComponent, QuestionCreatorComponent ],
  imports: [ BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
