import { Search } from "@/shared/search";
import ProjectCard from "./components/project-card";
import { getProjects } from "@/lib/actions/projects";
import Link from "next/link";
import { CreateProject } from "./components/create-project";

export default async function App() {
  const projects = await getProjects();

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
            <CreateProject />
          </div>

          <div className="flex flex-wrap gap-6">
            {projects.map((project) => (
              <Link
                key={project.projectId}
                href={`/dashboard/project/${project.projectId}`}
              >
                <ProjectCard project={project} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
