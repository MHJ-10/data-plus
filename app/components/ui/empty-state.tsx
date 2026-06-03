import { Button } from "@heroui/react";
import Link from "next/link";

interface EmptyStateProps {
  illustration: React.ReactNode;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

const EmptyState = (props: EmptyStateProps) => {
  const { illustration, title, description, primaryAction, secondaryAction } =
    props;

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 text-center">
      <div className="animate-in fade-in zoom-in-95 duration-500">
        {illustration}
      </div>
      <h2 className="animate-in fade-in slide-in-from-bottom-4 text-2xl font-semibold delay-100 duration-500">
        {title}
      </h2>
      <p className="text-muted animate-in fade-in slide-in-from-bottom-4 max-w-md delay-200 duration-500">
        {description}
      </p>
      {(primaryAction || secondaryAction) && (
        <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-wrap justify-center gap-3 delay-300 duration-500">
          {primaryAction && (
            <Button size="lg" variant="secondary">
              <Link href={primaryAction.href}>{primaryAction.label}</Link>
            </Button>
          )}
          {secondaryAction && (
            <Button size="lg" variant="tertiary">
              <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
