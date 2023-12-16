import { Search } from "@/components/shared/search";
import ProjectCard from "./components/project-card";
import { getProjects } from "@/lib/actions/projects";
import Link from "next/link";
import { CreateProject } from "./components/create-project";

export default async function App() {
  const projects = await getProjects();

  return (
    <>
      <div className="flex-1 space-y-4 px-16 pt-12">
        <div className="flex justify-between mb-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Projects</h2>
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
    </>
  );
}
