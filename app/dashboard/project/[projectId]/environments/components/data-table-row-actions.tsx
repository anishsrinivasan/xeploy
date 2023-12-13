"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row, Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Environments, Feature, FeaturesWithMapping } from "@/types/entity";
import { useEnvironment } from "../context/environment";

interface DataTableRowActionsProps<TData, TValue> {
  row: Row<TData>;
  column: Column<TData, TValue>;
}

export function DataTableRowActions<TData, TValue>({
  row,
}: DataTableRowActionsProps<TData, TValue>) {
  const { openEditEnvironment, openDeleteEnvironment } = useEnvironment();

  const onHandleAction = (action: string, environment: Environments) => {
    if (action === "edit") {
      openEditEnvironment(environment);
    }

    if (action === "delete") {
      openDeleteEnvironment(environment);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() =>
            onHandleAction("edit", row.original as Environments)
          }
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            onHandleAction("delete", row.original as Environments)
          }
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
