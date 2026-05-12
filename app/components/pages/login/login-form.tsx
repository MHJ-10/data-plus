"use client";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const res = await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({
        email: "mhj10mhj10jafari@gmail.com",
        otp: 204642,
      }),
    });

    console.log(res);

  };

  return (
    <Form className="space-y-6" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

          if (!emailRegex.test(value)) {
            return "لطفاً یک ایمیل معتبر وارد کنید";
          }

          return null;
        }}
      >
        <Label className="text-xl">ایمیل</Label>
        <Input
          placeholder="name@company.com"
          className="border text-lg"
          variant="secondary"
          dir="ltr"
        />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) return "رمز عبور باید حداقل ۸ کاراکتر باشد";

          if (value.length > 20) return "رمز عبور باید کمتر از ۲۰ کاراکتر باشد";

          const persianRegex = /[\u0600-\u06FF]/;
          if (persianRegex.test(value)) {
            return "رمز عبور نمی‌تواند شامل حروف فارسی باشد";
          }

          if (!/[A-Z]/.test(value))
            return "رمز عبور باید حداقل یک حرف بزرگ داشته باشد";

          if (!/[0-9]/.test(value)) {
            return "رمز عبور باید حداقل یک عدد داشته باشد";
          }

          return null;
        }}
      >
        <Label className="text-xl">رمز عبور</Label>
        <Input
          placeholder="رمز عبور را وارد کنید"
          className="border text-lg"
          variant="secondary"
        />
        <FieldError />
      </TextField>

      <Button
        className="bg-foreground hover:bg-foreground/90 w-full shadow-sm transition-colors"
        size="lg"
        type="submit"
      >
        ورود
      </Button>

      <p className="text-muted text-center text-lg">
        حساب کاربری ندارید؟
        <Link
          href="/signup"
          className="text-foreground hover:text-foreground/90 ms-2 font-bold transition-colors"
        >
          ایجاد حساب
        </Link>
      </p>
    </Form>
  );
};
