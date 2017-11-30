import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuizService {
  constructor(
    private http: HttpClient) {}

  createQuiz(quiz){
    console.log('Attempting to create Quiz: ', quiz.title);
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

  getQuizById(quizId) {
    const getQuizByIdUrl = '/api/quizzes/' + quizId;
    console.log('Attempting to retrieve QuizID: ', quizId);
    return this.http.get(getQuizByIdUrl, quizId);
  }

  getQuestionsByQuizId(quizId) {
    const getQuestionsByQuizIdUrl = '/api/quizzes/' + quizId + '/questions';
    console.log('Attempting to retrieve Questions for QuizID: ', quizId);
    return this.http.get(getQuestionsByQuizIdUrl, quizId);
  }

  getAnswersByQuestionId(quizId, questionId) {
    const getAnswersUrl = '/api/quizzes/' + quizId + '/questions/' + questionId + '/answers';
    console.log('Attempting to retrieve Answers for QuestionID: ', questionId);
    return this.http.get(getAnswersUrl, questionId);
  }
}
