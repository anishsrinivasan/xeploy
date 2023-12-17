import { getProject } from "@/lib/actions/projects";
import StatsCard from "./components/stats-card";
import Link from "next/link";
import { getProjectRoute } from "@/lib/route";
import GetStarted, { GetStartedLoader } from "./components/get-started";
import { Suspense } from "react";

export default async function Project({
  params,
}: {
  params: { projectId: string };
}) {
  const { totalEnv, totalFeatures, totalRequests } = await getProject(
    params.projectId
  );

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard name="API Requests" count={totalRequests} />
        <Link href={getProjectRoute(params.projectId, "features")}>
          <StatsCard name="Features" count={totalFeatures} />
        </Link>
        <Link href={getProjectRoute(params.projectId, "environments")}>
          <StatsCard name="Environments" count={totalEnv} />
        </Link>
      </div>

      <Suspense fallback={<GetStartedLoader />}>
        <GetStarted projectId={params.projectId} />
      </Suspense>
    </>
  );
}
