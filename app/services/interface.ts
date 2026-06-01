export interface UpdateUserRequest {
  id: string;
  nickName: string;
  newPassword?: string;
}

export interface DeleteAccountRequest {
  id: string;
}
