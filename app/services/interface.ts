export interface SignupRequest {
  nickname: string;
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}
