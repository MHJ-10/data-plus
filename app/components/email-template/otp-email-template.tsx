import * as React from "react";

interface EmailTemplateProps {
  nickname: string;
  otp: number;
}

const OTPEmailTemplate = ({ nickname, otp }: EmailTemplateProps) => {
  return (
    <div
      dir="rtl"
      style={{
        backgroundColor: "#f5f7fb",
        padding: "40px 20px",
        fontFamily:
          "Tahoma, IRANSans, Vazirmatn, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "40px 32px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Data Analyzer
          </h1>
        </div>

        <h2
          style={{
            margin: "0 0 16px",
            fontSize: "22px",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          تایید ایمیل
        </h2>

        <p
          style={{
            margin: "0 0 24px",
            fontSize: "16px",
            lineHeight: 1.9,
            color: "#4b5563",
          }}
        >
          {nickname} عزیز،
          <br />
          برای تکمیل ثبت‌نام، کد تایید زیر را وارد کنید.
        </p>

        <div
          style={{
            margin: "32px 0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#f3f4f6",
              borderRadius: "12px",
              padding: "18px 32px",
              letterSpacing: "10px",
              fontSize: "32px",
              fontWeight: 700,
              color: "#111827",
              direction: "ltr",
            }}
          >
            {otp}
          </div>
        </div>

        <p
          style={{
            margin: "0 0 24px",
            fontSize: "14px",
            color: "#6b7280",
            lineHeight: 1.8,
          }}
        >
          این کد تا ۱۰ دقیقه معتبر است.
        </p>

        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "24px",
            marginTop: "32px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#9ca3af",
              lineHeight: 1.8,
            }}
          >
            اگر شما این درخواست را ثبت نکرده‌اید، می‌توانید این ایمیل را نادیده
            بگیرید.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPEmailTemplate;
