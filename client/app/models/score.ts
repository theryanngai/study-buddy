export class Score {
  quizId: number;
  userId: number;
  score: number;
  correctCount: number;
  incorrectCount: number;

  constructor(scoreInfo: any) {
    this.quizId = scoreInfo.quizId;
    this.userId = scoreInfo.userId;
    this.score = scoreInfo.score;
    this.correctCount = scoreInfo.correctCount;
    this.incorrectCount = scoreInfo.incorrectCount;
  }
}




