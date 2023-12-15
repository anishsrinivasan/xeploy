"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { statuses } from "../data/data";
import { ColumnDef } from "@tanstack/react-table";
import { FeaturesWithMapping } from "@/types/entity";
import { DataTableColumnHeader } from "../../../../../../components/shared/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { updateFeatureStatus } from "@/lib/actions/features";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export const getColumns = (data: FeaturesWithMapping[]) => {
  const columns: ColumnDef<FeaturesWithMapping>[] = [
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
      accessorKey: "featureId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px] truncate">
          {row.getValue("featureId")}
        </div>
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
      accessorKey: "description",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("description")}
            </span>
          </div>
        );
      },
    },
  ];

  const enviroments =
    data && data[0]
      ? data[0].environments.sort((a, b) => (a.name > b.name ? 1 : -1))
      : [];

  enviroments.forEach((env) => {
    columns.push({
      accessorKey: env.name,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={env.name} />
      ),
      cell: ({ row }) => {
        const featureMapping = row.original;
        const enabled = String(
          featureMapping.environments.find((x) => x.envId === env.envId)
            ?.enabled
        );

        const initialStatus = statuses.find(
          (status) => status.value === enabled
        );

        const { toast } = useToast();
        const [isLoading, setLoading] = useState(false);
        const [status, setStatus] = useState(initialStatus);

        if (!status) {
          return null;
        }

        const handleChange = async (value: string) => {
          const enabled = value === "true";
          setLoading(true);
          const newStatus = statuses.find((status) => status.value === value);
          setStatus(newStatus);

          const { error } = await updateFeatureStatus(
            featureMapping.projectId,
            featureMapping.featureId,
            env.envId,
            enabled
          );

          setLoading(false);

          if (error) {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "Please try again after sometime!",
            });
            return;
          }

          toast({
            title: "Changes Updated",
            description: "Status has been updated.",
          });
        };

        return (
          <div className="flex w-[180px] items-center">
            <Select
              disabled={isLoading}
              onValueChange={handleChange}
              value={status.value}
            >
              <SelectTrigger
                className={cn(
                  "w-[150px] font-[600]",
                  status.value === "true"
                    ? "bg-success text-success-foreground"
                    : "bg-destructive text-destructive-foreground"
                )}
              >
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="true">Enabled</SelectItem>
                  <SelectItem value="false">Disabled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    });
  });

  columns.push({
    id: "actions",
    cell: ({ row, column }) => {
      return <DataTableRowActions row={row} column={column} />;
    },
  });
  return columns;
};
