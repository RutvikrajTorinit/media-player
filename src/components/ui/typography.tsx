import { cn } from "@/lib/utils";
import { LabelProps } from "@radix-ui/react-label";
import { ReactNode } from "react";

interface TYPOGRAPHY extends LabelProps {
  children: ReactNode;
}

export function TypographyH1({ children, ...props }: TYPOGRAPHY) {
  const { className } = props;

  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, ...props }: TYPOGRAPHY) {
  const { className } = props;

  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl border-b font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, ...props }: TYPOGRAPHY) {
  const { className } = props;

  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children, ...props }: TYPOGRAPHY) {
  const { className } = props;

  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyP({ children, ...props }: TYPOGRAPHY) {
  const { className } = props;

  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}

export function TypographyBlockquote({ children, ...props }: TYPOGRAPHY) {
  const { className } = props;

  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
}

export function TypographyLead({ children, ...props }: TYPOGRAPHY) {
  const { className } = props;

  return (
    <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
  );
}

export function TypographyLarge({ children, ...props }: TYPOGRAPHY) {
  const { className } = props;

  return (
    <div className={cn("text-lg font-semibold", className)}>{children}</div>
  );
}

export function TypographySmall({ children, ...props }: TYPOGRAPHY) {
  const { className } = props;

  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
}

export function TypographyMuted({ children, ...props }: TYPOGRAPHY) {
  const { className } = props;

  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
