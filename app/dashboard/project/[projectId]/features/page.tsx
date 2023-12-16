import { getFeaturesWithMappings } from "@/lib/actions/features";
import FeaturesManagement from "./components/features-management";
import { CreateFeature } from "./components/create-feature";
import { getEnvironments } from "@/lib/actions/environments";

export default async function ProjectFeatures({
  params,
}: {
  params: { projectId: string };
}) {
  const featuresWithMappings = await getFeaturesWithMappings(params.projectId);
  const environments = await getEnvironments(params.projectId);

  return (
    <>
      <div className="border rounded-lg space-y-4 p-8">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold tracking-tight mb-4">Features</h2>
          <CreateFeature
            environments={environments}
            projectId={params.projectId}
          />
        </div>

        <FeaturesManagement featuresWithMappings={featuresWithMappings} />
      </div>
    </>
  );
}
