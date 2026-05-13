"use server";

import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY!;

export async function encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export async function decrypt(cipherText: string) {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);

  return bytes.toString(CryptoJS.enc.Utf8);
}
