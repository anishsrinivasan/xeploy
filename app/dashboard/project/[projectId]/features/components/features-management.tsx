"use client";

import { DataTable } from "../components/data-table/data-table";
import { getColumns } from "./columns";
import { FeaturesWithMapping } from "@/types/entity";

type Props = {
  features: FeaturesWithMapping[];
};

export default function FeaturesManagement(props: Props) {
  return (
    <DataTable columns={getColumns(props.features)} data={props.features} />
  );
}
