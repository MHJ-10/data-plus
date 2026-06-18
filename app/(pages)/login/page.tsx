import { Login } from "@/components";

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) => {
  const callbackUrl = (await searchParams).callbackUrl;

  return <Login callbackUrl={callbackUrl} />;
};

export default LoginPage;
