import { getProjectStats } from "@/lib/actions/features";
import StatsCard from "./components/stats-card";
import { MOCK_PROJECT_ID } from "@/constants";

export default async function Project() {
  const { totalEnv, totalFeautres, totalRequests } = await getProjectStats(
    MOCK_PROJECT_ID
  );

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard name="API Requests" count={totalRequests} />
        <StatsCard name="Features" count={totalFeautres} />
        <StatsCard name="Environments" count={totalEnv} />
      </div>

      <div className="border rounded-lg space-y-4 p-8">
        <h2 className="text-xl font-bold tracking-tight mb-4">
          Getting Started
        </h2>
        <p>Let's start with a simple cURL</p>

        <div className="bg-muted p-4 rounded-lg">
          curl "https://included-weasel-35839.upstash.io/set/foo/bar" \
          <br />
          -H "Authorization: Bearer ********"
        </div>
      </div>
    </>
  );
}
