import { Appearance } from "./appearance";
import { DangerZone } from "./danger-zone";
import { ProfileInfo } from "./profile-info";
import { Session } from "./session";

const Settings = () => {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div>
        <p className="text-foreground text-3xl font-bold">تنظیمات</p>
        <p className="text-muted text-xl font-semibold">
          مدیریت حساب کاربری و تنظیمات شخصی‌سازی
        </p>
      </div>
      <ProfileInfo />
      <Appearance />
      <Session />
      <DangerZone />
    </div>
  );
};

export default Settings;
