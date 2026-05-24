"use client";

import { useDeleteAccount } from "@/services";
import { Button, Card, toast } from "@heroui/react";
import { Trash2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export const DangerZone = () => {
  const { data } = useSession();
  const { mutate, isPending } = useDeleteAccount();

  const onDeleteAccount = () => {
    mutate(
      { id: data?.user?.id || "" },
      {
        onSuccess: async () => {
          toast.success("حساب کاربری با موفقیت حذف شد.");
          await signOut({ redirectTo: "/" });
        },
      },
    );
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
            isPending={isPending}
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
