"use client";

import { Button, Card, Modal } from "@heroui/react";
import { AlertTriangleIcon, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export const Session = () => {
  return (
    <Card className="border sm:hidden">
      <Card.Header className="text-2xl">تنظیمات نشست</Card.Header>

      <Card.Content>
        <Modal>
          <Button variant="danger-soft" size="lg" fullWidth className="justify-center">
            <LogOutIcon />
            <span>خروج از حساب کاربری</span>
          </Button>
          <Modal.Backdrop variant="blur">
            <Modal.Container size="md">
              <Modal.Dialog>
                <Modal.Header className="flex flex-row items-center">
                  <Modal.Icon className="bg-danger/30 text-danger rounded-2xl">
                    <AlertTriangleIcon className="size-6" />
                  </Modal.Icon>
                  <Modal.Heading className="text-2xl font-bold">
                    تأیید خروج
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body className="text-muted overflow-hidden text-lg font-semibold">
                  آیا مطمئن هستید که می‌خواهید از حساب خود خارج شوید؟ برای
                  دسترسی دوباره باید مجدداً وارد شوید.
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="w-fit"
                    size="lg"
                    slot="close"
                    variant="secondary"
                  >
                    انصراف
                  </Button>
                  <Button
                    className="w-fit"
                    size="lg"
                    variant="danger"
                    slot="close"
                    onClick={() => {
                      signOut({ redirectTo: "/" });
                    }}
                  >
                    خروج
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </Card.Content>
    </Card>
  );
};
