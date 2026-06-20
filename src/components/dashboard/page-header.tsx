import { Badge } from "@/components/ui/badge";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  action
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <Badge variant="info">{eyebrow}</Badge>
        <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-normal text-white md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
