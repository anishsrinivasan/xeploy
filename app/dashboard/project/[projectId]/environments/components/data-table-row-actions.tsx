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

import { Environments } from "@/types/entity";
import { useEnvironment } from "../context/environment";
import { generateAPIToken } from "@/lib/actions/environments";
import { useToast } from "@/components/ui/use-toast";
import { useCopyToast } from "@/components/ui/use-copy-toast";
import { createcURL } from "@/lib/helpers/http";
import {
  Trash2,
  LucideEdit,
  BracesIcon,
  CopyCheck,
  RefreshCcwIcon,
} from "lucide-react";

interface DataTableRowActionsProps<TData, TValue> {
  row: Row<TData>;
  column: Column<TData, TValue>;
}

export function DataTableRowActions<TData, TValue>({
  row,
}: DataTableRowActionsProps<TData, TValue>) {
  const { openEditEnvironment, openDeleteEnvironment } = useEnvironment();
  const { toast } = useToast();
  const { copyToClipboard } = useCopyToast();

  const onHandleAction = async (action: string, environment: Environments) => {
    if (action === "edit") {
      openEditEnvironment(environment);
      return;
    }

    if (action === "delete") {
      openDeleteEnvironment(environment);
      return;
    }

    if (action === "copyToken") {
      copyToClipboard(environment.apiToken ?? "", {
        title: `Copied to Clipboard`,
        description: `Your token is copied to the Clipboard.`,
      });
    }

    if (action === "copycURL") {
      copyToClipboard(createcURL(environment.apiToken ?? "") || "", {
        title: `Copied to Clipboard`,
        description: `cURL is copied to the Clipboard.`,
      });
    }

    if (action === "generateToken") {
      const formData = new FormData();
      formData.append("projectId", environment?.projectId || "");
      formData.append("envId", environment?.envId || "");
      const { error, message } = await generateAPIToken(formData);

      if (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message ?? "Please try again after sometime!",
        });
        return;
      }

      toast({
        title: `New Token!`,
        description: `The token is generated.`,
      });
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
          onClick={() => onHandleAction("edit", row.original as Environments)}
        >
          <LucideEdit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            onHandleAction("copyToken", row.original as Environments)
          }
        >
          <CopyCheck className="mr-2 h-4 w-4" />
          Copy Token
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            onHandleAction("copycURL", row.original as Environments)
          }
        >
          <BracesIcon className="mr-2 h-4 w-4" />
          Copy cURL
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            onHandleAction("generateToken", row.original as Environments)
          }
        >
          <RefreshCcwIcon className="mr-2 h-4 w-4" />
          Generate Token
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => onHandleAction("delete", row.original as Environments)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
