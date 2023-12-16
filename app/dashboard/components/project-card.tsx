import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/types/entity";
import { Layers2Icon } from "lucide-react";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <CardComponent className="w-96 cursor-pointer">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription className="text-xs">
          {new Date(project.createdAt).toDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end">
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            {project?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </CardContent>
    </CardComponent>
  );
}

export function ProjectEmptyCard() {
  return (
    <div className="w-full text-center tracking-tight my-4 mx-auto max-w-[600px]">
      <div className="flex justify-center mb-6">
        <Layers2Icon className="w-36 h-36 text-muted-foreground" />
      </div>

      <h1 className="text-2xl mb-2">Start your first Project!</h1>
      <p className="text-sm text-muted-foreground">
        You can create your project by clicking the button at the top right.
      </p>
    </div>
  );
}
