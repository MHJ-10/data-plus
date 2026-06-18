"use client";

import { deleteAccount } from "@/data";
import { Button, Card, Modal, toast } from "@heroui/react";
import { AlertTriangleIcon, Trash2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTransition } from "react";

export const DangerZone = () => {
  const { data } = useSession();

  const [pending, startTransition] = useTransition();

  const onDeleteAccount = () => {
    startTransition(async () => {
      await deleteAccount(data?.user?.id || "")
        .then(async (res) => {
          toast.success(res.message);
          await signOut({ redirectTo: "/" });
        })
        .catch((err) => toast.danger(err.message));
    });
  };

  return (
    <Card className="border-danger border">
      <Card.Header className="flex flex-col">
        <p className="text-danger text-2xl font-semibold">بخش حساس</p>
        <p className="text-muted text-lg">این عملیات غیرقابل بازگشت است</p>
      </Card.Header>
      <Card.Content>
        <Card className="bg-danger/10 border-danger/50 flex flex-row items-center justify-between border">
          <div>
            <p className="text-lg font-semibold"> حذف حساب کاربری</p>
            <p className="text-muted font-medium">
              تمام اطلاعات شما برای همیشه حذف می‌شود
            </p>
          </div>
          <Modal>
            <Button variant="danger" size="lg" isPending={pending}>
              حذف
              <Trash2Icon />
            </Button>
            <Modal.Backdrop variant="blur">
              <Modal.Container size="md">
                <Modal.Dialog>
                  <Modal.Header className="flex flex-row items-center">
                    <Modal.Icon className="bg-danger/30 text-danger rounded-2xl">
                      <AlertTriangleIcon className="size-6" />
                    </Modal.Icon>
                    <Modal.Heading className="text-2xl font-bold">
                      تأیید حذف حساب کاربری
                    </Modal.Heading>
                  </Modal.Header>
                  <Modal.Body className="text-muted overflow-hidden text-lg font-semibold">
                    آیا مطمئن هستید که می‌خواهید حساب کاربری خود را حذف کنید؟ با
                    حذف حساب کاربری، تمام اطلاعات شما حذف می‌شود.
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
                      onClick={onDeleteAccount}
                    >
                      تأیید
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        </Card>
      </Card.Content>
    </Card>
  );
};
