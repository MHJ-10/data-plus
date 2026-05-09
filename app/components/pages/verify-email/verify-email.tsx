"use client";

import { Card, InputOTP } from "@heroui/react";
import { MailIcon } from "lucide-react";

const VeifyEmail = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="flex flex-col items-center gap-8 border py-20 px-14">
        <Card.Header className="w-fit">
          <Card variant="tertiary">
            <MailIcon className="size-8" />
          </Card>
        </Card.Header>
        <Card.Content className="space-y-2 text-center">
          <p className="text-foreground text-3xl font-bold">تأیید ایمیل</p>
          <p className="text-muted text-lg font-semibold">
            کد تأیید ۶ رقمی به این ایمیل ارسال شد:
          </p>
          <p className="text-foreground text-lg font-semibold">
            test@gmail.com
          </p>
          <InputOTP maxLength={6}>
            <InputOTP.Group dir="ltr">
              <InputOTP.Slot index={0} className="bg-muted/20 border" />
              <InputOTP.Slot index={1} className="bg-muted/20 border" />
              <InputOTP.Slot index={2} className="bg-muted/20 border" />
              <InputOTP.Slot index={3} className="bg-muted/20 border" />
              <InputOTP.Slot index={4} className="bg-muted/20 border" />
              <InputOTP.Slot index={5} className="bg-muted/20 border" />
            </InputOTP.Group>
          </InputOTP>
        </Card.Content>
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
};

export default VeifyEmail;
