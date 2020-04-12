import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionData } from '../models/question-data.model';
import { Subscription, Subject } from 'rxjs';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  isLoading = false;
  questions: QuestionData[] = [];
  private questionsSub: Subscription;

  isTimeUp = false;

  answer = [];
  correctAnswer = [];

  marks = 0;

  constructor(public questionService: QuestionService) { }

  ngOnInit() {
    this.isLoading = true;
    this.questionService.getData();
    this.questionsSub = this.questionService.getQuestionsUpdateListener()
      .subscribe((questionData: { questions: QuestionData[] }) => {
        this.isLoading = false;
        console.log('value', questionData);

        this.questions = questionData.questions;
        for (let q = 0; q < 10; q++) {
          console.log(this.questions[q].answer);

          this.correctAnswer[q] = this.questions[q].answer;
        }
        console.log('this.correctAnswer', this.correctAnswer);

        // console.log(this.correctAnswer);
        let timer = setTimeout(() => {
          this.isTimeUp = true;
          // console.log(this.answer);
        }, 300000);
      });
  }

  onSubmit() {
    console.log(this.answer, this.correctAnswer);
    this.marks = 0;

    for (let a = 0; a < this.answer.length; a++) {
      if (this.answer[a] === this.correctAnswer[a]) {
        this.marks += 3;
        console.log('+', this.marks);

      } else {
        console.log('-', this.marks);

        this.marks -= 1;
      }
    }
    console.log(this.marks);
    this.questionService.sendMarks(this.marks)
  }

  ngOnDestroy() {
    this.questionsSub.unsubscribe();
  }
}
