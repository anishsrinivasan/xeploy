"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row, Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Feature, FeaturesWithMapping } from "@/types/entity";
import { useFeature } from "../context/feature";
import { Trash2, LucideEdit } from "lucide-react";

interface DataTableRowActionsProps<TData, TValue> {
  row: Row<TData>;
  column: Column<TData, TValue>;
}

export function DataTableRowActions<TData, TValue>({
  row,
}: DataTableRowActionsProps<TData, TValue>) {
  const { openEditFeature, openDeleteFeature } = useFeature();

  const onHandleAction = (action: string, data: FeaturesWithMapping) => {
    const feature: Partial<Feature> = {
      featureId: data?.featureId,
      projectId: data?.projectId,
      description: data?.description,
      name: data?.name,
    };

    if (action === "edit") {
      openEditFeature(feature);
    }

    if (action === "delete") {
      openDeleteFeature(feature);
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
            onHandleAction("edit", row.original as FeaturesWithMapping)
          }
        >
          <LucideEdit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            onHandleAction("delete", row.original as FeaturesWithMapping)
          }
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
