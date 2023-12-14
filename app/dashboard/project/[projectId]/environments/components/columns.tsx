"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Environments } from "@/types/entity";
import { DataTableColumnHeader } from "../../../../../../components/shared/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { CopyIcon } from "@radix-ui/react-icons";
import { useCopyToast } from "@/components/ui/use-copy-toast";

export const getColumns = (data: Environments[]) => {
  const columns: ColumnDef<Environments>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "envId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px] text-ellipsis">{row.getValue("envId")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "apiToken",
      enableSorting: false,
      enableHiding: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="API Token" />
      ),
      cell: ({ row }) => {
        const { copyToClipboard } = useCopyToast();

        const onCopy = () => {
          copyToClipboard(row.original.apiToken || "", {
            title: `Copied to Clipboard`,
            description: `Your token is copied to the Clipboard.`,
          });
        };

        return (
          <div className="flex items-center space-x-2">
            <span className="max-w-[200px] truncate font-medium">
              {"*********"}
            </span>
            <div onClick={onCopy} className="cursor-pointer text-6">
              <CopyIcon className="h-6 w-6" />
            </div>
          </div>
        );
      },
    },
  ];

  columns.push({
    id: "actions",
    cell: ({ row, column }) => {
      return <DataTableRowActions row={row} column={column} />;
    },
  });
  return columns;
};