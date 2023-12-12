import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/types/entity";

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
          <AvatarImage className="w-8" src="/avatars/01.png" alt="@shadcn" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </CardContent>
    </CardComponent>
  );
}
