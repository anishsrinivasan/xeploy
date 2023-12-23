"use client";

import { toast as SonnerToast, ExternalToast } from "sonner";

export type Toast = {
  variant?: string;
  title: string;
  description: string;
} & ExternalToast;

function useToast() {
  const toast = (props: Toast) => {
    if (props?.variant === "destructive") {
      SonnerToast.error(props.title, {
        ...props,
      });
      return;
    }

    if (props?.variant === "success") {
      SonnerToast.error(props.title, {
        ...props,
      });
      return;
    }

    SonnerToast(props.title, {
      ...props,
    });
  };

  return { toast };
}

export { useToast };
