export interface SignupRequest {
  nickname: string;
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface ResendOTPRequest {
  email: string;
  nickname: string;
}

export interface CheckPasswordRequest {
  id: string;
  password: string;
}

export interface UpdateUserRequest {
  id: string;
  nickName: string;
  newPassword?: string;
}

export interface DeleteAccountRequest {
  id: string;
}
