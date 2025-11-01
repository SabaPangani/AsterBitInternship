import { Injectable } from '@angular/core';
import { FormValue, SubmittedPayload } from '../models/auth';
import { BehaviorSubject, catchError, of, switchMap, tap, throwError, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthSubmissionService {
  private payloadSource$  = new BehaviorSubject<SubmittedPayload | null>(null);

  payload$ = this.payloadSource$.asObservable();

  private statusSource$ = new BehaviorSubject<'idle' | 'submitting' | 'success' | 'error'>('idle');

  status$ = this.statusSource$.asObservable();

  private errorMessageSource$ = new BehaviorSubject<string | null>(null);

  errorMessage$ = this.errorMessageSource$.asObservable();

  constructor() {}

  submit(value: FormValue): void {
    if (this.statusSource$.value === 'submitting') {
      return;
    }

    this.statusSource$.next('submitting');
    this.errorMessageSource$.next(null);

    timer(1000)
      .pipe(
        switchMap(() => {
          const payload: SubmittedPayload = {
            email: value.email,
            password: value.password,
            submittedAt: new Date().toISOString(),
          };
          return of(payload);
        }),
        tap((payload) => {
          this.payloadSource$.next(payload);
          this.statusSource$.next('success');
        }),
        catchError((err) => {
          this.errorMessageSource$.next('Something went wrong');
          this.statusSource$.next('error');
          return throwError(() => err);
        })
      )
      .subscribe();
  }

  clear(): void {
    this.payloadSource$.next(null);
    this.errorMessageSource$.next(null);
    this.statusSource$.next('idle');
  }

  simulateError(): void {
    if (this.statusSource$.value === 'submitting') return;

    this.errorMessageSource$.next('Simulated error');
    this.statusSource$.next('error');
  }
}
