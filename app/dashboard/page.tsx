import { Search } from "@/shared/search";
import ProjectCard from "./components/project-card";
import { Button } from "@/components/ui/button";

export default async function App() {
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="space-y-4 p-8 pt-6 min-h-[400px] rounded-md">
          <div className="flex justify-between mb-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">
                Projects
              </h2>
              <Search className="w-96" />
            </div>
            <Button>Create Project</Button>
          </div>

          <div className="flex flex-wrap gap-6">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div>
      </div>
    </>
  );
}
