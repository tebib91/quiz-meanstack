import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionData } from '../models/question-data.model';
import { Subject } from 'rxjs';

import { environment } from "../../environments/environment";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions: QuestionData[] = [];
  private questionsUpdated = new Subject<{ questions: QuestionData[] }>();

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  getData() {
    this.http.get<{ questions: QuestionData[] }>(apiUrl + '/question')
      .subscribe((questions) => {
        this.questions = questions.questions;
        this.questionsUpdated.next({ questions: this.questions });
      });
  }

  getQuestionsUpdateListener() {
    return this.questionsUpdated.asObservable();
  }
  sendQuestion(data) {
    this.http.post(apiUrl + "/question", data)
      .subscribe(response => {
        console.log(response);

      });
  }

  sendMarks(marks: number) {
    let userEmail = localStorage.getItem("email");
    const data = {
      userEmail: userEmail,
      marks: marks
    };
    this.http.post(apiUrl + "/question/mark", data)
      .subscribe((response: any) => {
        console.log(response);
        alert(`Your score is ${response.marks}`)
        this.router.navigate(['/leaderboard'])
      });
  }
}
