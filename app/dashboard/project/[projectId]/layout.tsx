import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-link";
import "@/app/globals.css";
import { getProjectRoute } from "@/lib/route";


export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projectId = "hyzern";

  return (
    <div className="w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="space-y-4 p-8 pt-6 min-h-[400px] rounded-md">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Hyzern</h2>
            <Button variant="outline">Edit Project</Button>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value={getProjectRoute(projectId, "")}>
                Overview
              </TabsTrigger>
              <TabsTrigger value={getProjectRoute(projectId, "features")}>
                Features
              </TabsTrigger>
              <TabsTrigger value={getProjectRoute(projectId, "environments")}>
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
