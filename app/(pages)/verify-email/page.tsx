import { VerifyEmail } from "@/components";

const VeirfyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const data = (await searchParams).data;
  return <VerifyEmail encryptedData={data} />;
};

export default VeirfyEmailPage;
