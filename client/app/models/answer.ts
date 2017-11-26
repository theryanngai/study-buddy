
export class Answer {
  questionId: number;
  answerText: string;
  answerType: string;
  isCorrect: boolean;

  constructor(answerDetails: any) {
    this.questionId = answerDetails.questionId;
    this.answerText = answerDetails.answerText;
    this.answerType = answerDetails.answerType;
    this.isCorrect = answerDetails.isCorrect;
  }
}




