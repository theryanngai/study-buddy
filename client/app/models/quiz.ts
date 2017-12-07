
export class Quiz {
  userId: number;
  title: string;
  description: string;
  tags: [string];
  isPublic: boolean;

  constructor(quizDetails: any) {
    this.userId = quizDetails.userId;
    this.title = quizDetails.title;
    this.description = quizDetails.description;
    this.tags = quizDetails.tags;
    this.isPublic = quizDetails.isPublic;
  }
}




