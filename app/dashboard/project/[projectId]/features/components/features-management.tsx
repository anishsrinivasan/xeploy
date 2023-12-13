"use client";

import { DataTable } from "../components/data-table/data-table";
import { FeatureProvider } from "../context/feature";
import { getColumns } from "./columns";
import { FeaturesWithMapping } from "@/types/entity";
import { EditFeature } from "./edit-feature";
import { DeleteFeature } from "./delete-feature";

type Props = {
  featuresWithMappings: FeaturesWithMapping[];
};

export default function FeaturesManagement(props: Props) {
  return (
    <FeatureProvider>
      <DataTable
        columns={getColumns(props.featuresWithMappings)}
        data={props.featuresWithMappings}
      />
      <EditFeature />
      <DeleteFeature />
    </FeatureProvider>
  );
}
