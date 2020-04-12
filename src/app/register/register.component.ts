import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  private authStatusSub: Subscription

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((path) => {
      window.scrollTo(0, 0);
    });
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }
  createUser(form: NgForm) {
    if (form.invalid) {
      console.log('Error');
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
