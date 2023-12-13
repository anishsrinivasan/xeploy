import { getProject } from "@/lib/actions/projects";
import StatsCard from "./components/stats-card";
import Link from "next/link";
import { getProjectRoute } from "@/lib/route";

export default async function Project({
  params,
}: {
  params: { projectId: string };
}) {
  const { totalEnv, totalFeautres, totalRequests } = await getProject(
    params.projectId
  );

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard name="API Requests" count={totalRequests} />
        <Link href={getProjectRoute(params.projectId, "features")}>
          <StatsCard name="Features" count={totalFeautres} />
        </Link>
        <Link href={getProjectRoute(params.projectId, "environments")}>
          <StatsCard name="Environments" count={totalEnv} />
        </Link>
      </div>

      <div className="border rounded-lg space-y-4 p-8">
        <h2 className="text-xl font-bold tracking-tight mb-4">
          Getting Started
        </h2>
        <p>Let's start with a simple cURL</p>

        <pre className="bg-muted p-4 rounded-lg">
          curl "https://included-weasel-35839.upstash.io/set/foo/bar" \
          <br />
          -H "Authorization: Bearer ********"
        </pre>
      </div>
    </>
  );
}
