import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-link";
import "@/app/globals.css";
import { getProjectRoute } from "@/lib/route";
import { getProject } from "@/lib/actions/projects";
import { MOCK_PROJECT_ID } from "@/constants";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: string };
}) {
  const { project } = await getProject(params.projectId);

  return (
    <div className="w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="space-y-4 p-8 pt-6 min-h-[400px] rounded-md">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              {project.name}
            </h2>
            <Button variant="outline">Edit Project</Button>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value={getProjectRoute(project.projectId, "")}>
                Overview
              </TabsTrigger>
              <TabsTrigger
                value={getProjectRoute(project.projectId, "features")}
              >
                Features
              </TabsTrigger>
              <TabsTrigger
                value={getProjectRoute(project.projectId, "environments")}
              >
                Environments
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              {children}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
