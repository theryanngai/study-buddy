
export class Question {
  quizId: number;
  correctAnswerId: number;
  questionText: string;
  questionType: string;

  constructor(questionDetails: any) {
    this.quizId = questionDetails.quizId;
    this.correctAnswerId = questionDetails.correctAnswerId;
    this.questionText = questionDetails.questionText;
    this.questionType = questionDetails.questionType;
  }
}




