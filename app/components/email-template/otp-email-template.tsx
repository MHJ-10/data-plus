import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface EmailTemplateProps {
  nickname: string;
  otp: number;
}

const OTPEmailTemplate = ({ nickname, otp }: EmailTemplateProps) => {
  return (
    <Html lang="fa" dir="rtl">
      <Head />
      <Preview>{`کد تأیید ورود شما: ${otp}`}</Preview>

      <Tailwind>
        <Body dir="rtl" className="bg-background">
          <Container className="mx-auto max-w-130 rounded-2xl px-8 py-10 shadow-sm">
            <Section className="mb-8 text-center">
              <Heading className="m-0 text-center text-2xl font-bold text-gray-900">
                دیتا پلاس
              </Heading>
            </Section>

            <Heading className="m-0 mb-4 text-xl font-bold text-gray-700">
              تأیید ایمیل
            </Heading>

            <Text className="m-0 mb-6 text-base leading-8 text-gray-600">
              {nickname} عزیز،
              <br />
              برای تکمیل ثبت‌نام، کد تأیید زیر را وارد کنید.
            </Text>

            <Section className="my-8 text-center">
              <div
                className="inline-block rounded-xl bg-gray-100 px-8 py-4 text-[32px] font-bold tracking-[10px] text-gray-900"
                style={{ direction: "ltr" }}
              >
                {`${otp}`}
              </div>
            </Section>

            <Text className="m-0 mb-6 text-sm leading-7 text-gray-500">
              این کد تا ۱۰ دقیقه معتبر است.
            </Text>

            <Hr className="my-8 border-gray-200" />

            <Text className="m-0 text-[13px] leading-7 text-gray-400">
              اگر شما این درخواست را ثبت نکرده‌اید، می‌توانید این ایمیل را
              نادیده بگیرید.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OTPEmailTemplate;
