import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuizService {
  constructor(
    private http: HttpClient) {}

  createQuiz(quiz){
    console.log('Attempting to create Quiz: ', quiz.title);
    quiz.userId = 12345;
    return this.http.post('/api/quizzes/create', quiz);
  }

  createQuestion(question){
    const createQuestionUrl = '/api/quizzes/' + question.quizId + '/questions/create';
    console.log('Attempting to create Question: ', question.questionText);
    return this.http.post(createQuestionUrl, question);
  }

  createAnswer(answer, quizId) {
    const createAnswerUrl = [
      '/api/quizzes/',
      quizId,
      '/questions/',
      answer.questionId,
      '/answers/create'
    ].join('');

    console.log('Attempting to create Answer: ', answer.answerText);
    return this.http.post(createAnswerUrl, answer);
  }
}
