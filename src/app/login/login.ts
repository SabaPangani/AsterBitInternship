import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthSubmissionService } from '../services/auth-submission.service';
import { Observable, timer } from 'rxjs';
import { Status, SubmittedPayload } from '../models/auth';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  status$: Observable<Status>;
  payload$: Observable<SubmittedPayload | null>;
  errorMsg$: Observable<string | null>;

  constructor(private formBuilder: FormBuilder, private auth: AuthSubmissionService) {
    this.status$ = this.auth.status$;
    this.payload$ = this.auth.payload$;
    this.errorMsg$ = this.auth.errorMessage$;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  showError(controlName: string, errorType?: string): boolean {
    const control = this.loginForm.get(controlName);
    if (!control) return false;
    if (errorType) {
      return control.hasError(errorType) && control.touched;
    }
    return control.invalid && control.touched;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.auth.submit(this.loginForm.value);
    this.status$.subscribe((s) => {
      if (s === 'success') {
        this.loginForm.reset();
        this.loginForm.markAsPristine();
        this.loginForm.markAsUntouched();
      }
    });
  }
  onClearPreview(): void {
    this.auth.clear();
  }
  onSimulateError(): void {
    this.auth.simulateError();
  }
}
