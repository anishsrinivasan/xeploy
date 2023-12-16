import { getEnvironments } from "@/lib/actions/environments";
import EnvironmentsManagement from "./components/environments-management";
import { CreateEnvironment } from "./components/create-environment";

export default async function ProjectEnvironments({
  params,
}: {
  params: { projectId: string };
}) {
  const environments = await getEnvironments(params.projectId);
  return (
    <>
      <div className="border rounded-lg space-y-4 p-8">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold tracking-tight mb-4">
            Environments
          </h2>
          <CreateEnvironment
            environments={environments}
            projectId={params.projectId}
          />
        </div>
        <EnvironmentsManagement environments={environments} />
      </div>
    </>
  );
}
