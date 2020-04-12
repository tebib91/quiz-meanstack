import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder, private api: QuestionService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      question: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      answer: ['', Validators.required],

    })
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.myForm.value);
    this.api.sendQuestion(this.myForm.value).subscrive(value => {
      console.log('value', value);

    })
  }
}
