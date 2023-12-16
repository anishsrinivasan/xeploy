"use client";

import { DataTable } from "../../../../../../components/shared/data-table/data-table";
import { EnvironmentProvider } from "../context/environment";
import { getColumns } from "./columns";
import { Environments } from "@/types/entity";
import { EditEnvironment } from "./edit-environment";
import { DeleteEnvironment } from "./delete-environment";

type Props = {
  environments: Environments[];
};

export default function EnvironmentsManagement(props: Props) {
  return (
    <EnvironmentProvider>
      <DataTable
        columns={getColumns(props.environments)}
        data={props.environments}
      />
      <EditEnvironment />
      <DeleteEnvironment />
    </EnvironmentProvider>
  );
}
