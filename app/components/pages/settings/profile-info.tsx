"use client";

import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Modal,
  TextField,
} from "@heroui/react";
import {
  CircleCheckBigIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ProfileForm {
  nickname?: string;
  password?: string;
  newPassword?: string;
}

export const ProfileInfo = () => {
  const { data } = useSession();
  const [isPasswordVisible, setIsPasswordVisible] = useState<
    [boolean, boolean]
  >([false, false]);

  const [formData, setFormData] = useState<ProfileForm>({
    nickname: "",
    password: "",
    newPassword: "",
  });

  const onConfirmPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Partial<Record<keyof ProfileForm, string>> = {};
    formData.forEach((value, key) => {
      data[key as keyof ProfileForm] = value.toString();
    });

    setFormData((prev) => ({ ...prev, ...data }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
  };

  useEffect(() => {
    const setNickname = () => {
      if (data?.user)
        setFormData((prev) => ({ ...prev, nickname: data.user?.name || "" }));
    };

    setNickname();
  }, [data]);

  return (
    <Card className="border">
      <Card.Header className="text-2xl">اطلاعات پروفایل</Card.Header>

      <Card.Content>
        <Form className="space-y-4" onSubmit={onSubmit}>
          <TextField
            value={formData.nickname}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, nickname: value }))
            }
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
            <Label className="flex items-center gap-2 text-xl">
              <UserIcon className="size-4" />
              نام نمایشی
            </Label>
            <Input
              placeholder="نام نمایشی خود را وارد کنید"
              className="border text-lg"
              variant="secondary"
            />
            <FieldError />
          </TextField>
          <TextField name="email" type="email">
            <Label className="flex items-center gap-2 text-xl">
              <MailIcon className="size-4" />
              ایمیل
            </Label>
            <Input
              className="border text-lg"
              variant="secondary"
              dir="ltr"
              disabled
              value={data?.user?.email || ""}
            />
            <Description className="text-success flex items-center gap-2 text-lg">
              <CircleCheckBigIcon className="size-4" /> ایمیل تأیید شده است
            </Description>
            <FieldError />
          </TextField>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-xl">
              <LockIcon className="size-4" />
              رمز عبور
            </Label>
            <Modal>
              <Button className="text-lg" variant="tertiary" size="lg">
                تغییر رمز عبور
              </Button>
              <Modal.Backdrop variant="opaque">
                <Form onSubmit={onConfirmPassword}>
                  <Modal.Container size="lg" className="overflow-hidden">
                    <Modal.Dialog>
                      <Modal.Body className="space-y-4 overflow-hidden p-2">
                        <TextField
                          className="relative"
                          name="password"
                          type="password"
                          autoComplete="off"
                          validate={(value) => {
                            const passwordRegex =
                              /^(?=.*[A-Z])(?=.*[0-9])(?!.*[\u0600-\u06FF]).{8,20}$/;
                            if (!passwordRegex.test(value)) {
                              return "رمز عبور معتبر نیست";
                            }
                            return null;
                          }}
                        >
                          <Input
                            placeholder="رمز عبور فعلی"
                            className="border text-lg"
                            variant="secondary"
                            type={isPasswordVisible[0] ? "text" : "password"}
                          />
                          <Button
                            isIconOnly
                            variant="ghost"
                            size="md"
                            className="text-muted absolute top-1 left-1"
                            onClick={() =>
                              setIsPasswordVisible((prev) => [
                                !prev[0],
                                prev[1],
                              ])
                            }
                          >
                            {isPasswordVisible[0] ? (
                              <EyeOffIcon />
                            ) : (
                              <EyeIcon />
                            )}
                          </Button>
                          <Description>
                            رمز عبور باید حداقل ۸ کاراکتر باشد و شامل یک حرف
                            بزرگ و یک عدد باشد
                          </Description>
                          <FieldError />
                        </TextField>
                        <TextField
                          className="relative"
                          name="newPassword"
                          type="password"
                          autoComplete="off"
                          validate={(value) => {
                            const passwordRegex =
                              /^(?=.*[A-Z])(?=.*[0-9])(?!.*[\u0600-\u06FF]).{8,20}$/;
                            if (!passwordRegex.test(value)) {
                              return "رمز عبور معتبر نیست";
                            }
                            return null;
                          }}
                        >
                          <Input
                            placeholder="رمز عبور جدید"
                            className="border text-lg"
                            variant="secondary"
                            type={isPasswordVisible[1] ? "text" : "password"}
                          />
                          <Button
                            isIconOnly
                            variant="ghost"
                            size="lg"
                            className="text-muted absolute top-1 left-1"
                            onClick={() =>
                              setIsPasswordVisible((prev) => [
                                prev[0],
                                !prev[1],
                              ])
                            }
                          >
                            {isPasswordVisible[1] ? (
                              <EyeOffIcon />
                            ) : (
                              <EyeIcon />
                            )}
                          </Button>
                          <FieldError />
                        </TextField>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className="w-fit"
                          size="lg"
                          slot="close"
                          variant="secondary"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              password: "",
                              newPassword: "",
                            }))
                          }
                        >
                          انصراف
                        </Button>
                        <Button
                          className="w-fit"
                          size="lg"
                          variant="primary"
                          slot="close"
                          type="submit"
                        >
                          تأیید
                        </Button>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </Modal.Container>
                </Form>
              </Modal.Backdrop>
            </Modal>
          </div>

          <div className="bg-muted/50 h-px w-full" />

          <Button
            size="lg"
            className="text-background bg-foreground text-lg transition-colors hover:opacity-90"
            type="submit"
          >
            ذخیره تغییرات
          </Button>
        </Form>
      </Card.Content>
    </Card>
  );
};
