
export class Question {
  quizId: number;
  questionText: string;
  questionType: string;

  constructor(questionDetails: any) {
    this.quizId = questionDetails.quizId;
    this.questionText = questionDetails.questionText;
    this.questionType = questionDetails.questionType;
  }
}




