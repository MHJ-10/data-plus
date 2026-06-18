"use client";

import { useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeOffIcon, EyeIcon } from "lucide-react";

export const LoginForm = ({
  callbackUrl = "/dashboard",
}: {
  callbackUrl?: string;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      redirectTo: callbackUrl,
    });

    if (result?.error) {
      toast.danger("نام کاربری یا رمز عبور اشتباه است");
      return;
    }

    router.refresh();
    router.replace(result?.url || callbackUrl);
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
        className="relative"
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
          type={isPasswordVisible ? "text" : "password"}
        />
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          className="text-muted absolute top-9.5 left-1"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
        >
          {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
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
