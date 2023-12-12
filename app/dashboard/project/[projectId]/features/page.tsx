import { Button } from "@/components/ui/button";
import { getFeaturesWithMappings } from "@/lib/actions/features";
import FeaturesManagement from "./components/features-management";

export default async function ProjectFeatures({
  params,
}: {
  params: { projectId: string };
}) {
  const features = await getFeaturesWithMappings(params.projectId);

  return (
    <>
      <div className="border rounded-lg space-y-4 p-8">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold tracking-tight mb-4">Features</h2>
          <Button variant="secondary">Add Feature</Button>
        </div>

        <p>Let's start with a simple cURL</p>
        <FeaturesManagement features={features} />
      </div>
    </>
  );
}
