import CodeBlockCurl from "../components/code-block";
import { getEnvironments } from "@/lib/actions/environments";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  projectId: string;
};

export default async function GetStarted(props: Props) {
  const environments = await getEnvironments(props.projectId);

  return (
    <div className="border rounded-lg space-y-4 p-8">
      <h2 className="text-xl font-bold tracking-tight mb-4">Getting Started</h2>
      <p>Let's start with a simple cURL</p>

      <CodeBlockCurl environments={environments} />
    </div>
  );
}

export function GetStartedLoader() {
  return <Skeleton className="h-[300px] rounded-lg" />;
}
