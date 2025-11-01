export type Status = 'idle' | 'submitting' | 'success' | 'error';

export interface FormValue {
  email: string;
  password: string;
}

export interface SubmittedPayload {
  email: string;
  password: string; 
  submittedAt: string | number;
}
