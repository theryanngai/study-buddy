
export class Quiz {
  userId: number;
  description: string;
  questions: number[];
  tags: string[];

  constructor(quizDetails: any) {
    this.userId = quizDetails.userId;
    this.description = quizDetails.description;
    this.questions = quizDetails.questions;
    this.tags = quizDetails.tags;
  }
}




