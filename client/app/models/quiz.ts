
export class Quiz {
  userId: number;
  title: string;
  description: string;
  questions: number[];
  tags: string[];

  constructor(quizDetails: any) {
    this.userId = quizDetails.userId;
    this.title = quizDetails.title;
    this.description = quizDetails.description;
    this.questions = quizDetails.questions;
    this.tags = quizDetails.tags;
  }
}




