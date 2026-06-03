"use client";

import { Error } from "./components";

const ErrorPage = ({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) => {
  return <Error error={error} resetError={unstable_retry} />;
};

export default ErrorPage;
