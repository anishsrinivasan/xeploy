"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";

interface Context {
  defaultValue: string;
  searchParam: string;
  selected: string;
}
const TabsContext = React.createContext<Context>(null as any);

export function Tabs(props: {
  children: React.ReactNode;
  className?: string;
  /**
   * The default tab
   */
  defaultValue: string;
  /**
   * Which search param to use
   * @default "tab"
   */
  searchParam?: string;
}) {
  const { children, className, searchParam = "tab", ...other } = props;
  const searchParams = useSearchParams()!;

  const selected = searchParams.get(searchParam) || props.defaultValue;

  const pathname = usePathname();

  return (
    <TabsContext.Provider value={{ ...other, searchParam, selected }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

const useContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error(
      "Tabs compound components cannot be rendered outside the Tabs component"
    );
  }

  return context;
};

export function TabsList(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      {...props}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        props.className
      )}
    />
  );
}

export const TabsTrigger = (props: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) => {
  const pathname = usePathname();

  const isActive = props.value === pathname;
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        props.className
      )}
      data-state={isActive ? "active" : "inactive"}
      href={props.value}
      scroll={false}
      shallow={true}
    />
  );
};

export function TabsContent(props: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) {
  const context = useContext();

  if (context.selected !== props.value) {
    return null;
  }

  return (
    <div
      {...props}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        props.className
      )}
    />
  );
}
