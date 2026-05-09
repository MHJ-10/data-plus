"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SignupForm = () => {
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    router.push("/verify-email");
  };

  return (
    <Form className="space-y-6" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="nickname"
        type="text"
        validate={(value) => {
          const v = value?.trim();

          if (v.length < 3) {
            return "نام نمایشی باید حداقل ۳ کاراکتر باشد";
          }

          if (v.length > 30) {
            return "نام نمایشی باید کمتر از ۳۰ کاراکتر باشد";
          }

          const regex = /^[A-Za-z\u0600-\u06FF\s]+$/;

          if (!regex.test(v)) {
            return "فقط حروف فارسی، انگلیسی و فاصله مجاز است";
          }

          return null;
        }}
      >
        <Label className="text-xl">نام نمایشی</Label>
        <Input
          placeholder="نام نمایشی خود را وارد کنید"
          className="border text-lg"
          variant="secondary"
        />
        <FieldError />
      </TextField>

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
          placeholder="یک رمز عبور قوی ایجاد کنید"
          className="border text-lg"
          variant="secondary"
        />
        <FieldError />
        <Description>
          رمز عبور باید حداقل ۸ کاراکتر باشد و شامل یک حرف بزرگ و یک عدد باشد
        </Description>
      </TextField>

      <Button
        className="bg-foreground hover:bg-foreground/90 w-full shadow-sm transition-colors"
        size="lg"
        type="submit"
      >
        ایجاد حساب
      </Button>

      <p className="text-muted text-center text-lg">
        حساب کاربری دارید؟{" "}
        <Link
          href="/login"
          className="text-foreground hover:text-foreground/90 font-bold transition-colors"
        >
          ورود
        </Link>
      </p>
    </Form>
  );
};
