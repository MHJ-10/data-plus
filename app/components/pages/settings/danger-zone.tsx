"use client";

import { deleteAccount } from "@/data";
import { Button, Card, toast } from "@heroui/react";
import { Trash2Icon } from "lucide-react";
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
          <Button
            variant="danger"
            size="lg"
            isPending={pending}
            onClick={onDeleteAccount}
          >
            حذف
            <Trash2Icon />
          </Button>
        </Card>
      </Card.Content>
    </Card>
  );
};
