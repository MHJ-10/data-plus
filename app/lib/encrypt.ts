import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY!;

export function encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decrypt(cipherText: string) {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);

  return bytes.toString(CryptoJS.enc.Utf8);
}
