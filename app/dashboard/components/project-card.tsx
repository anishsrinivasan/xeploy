import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProjectCard() {
  return (
    <CardComponent className="w-96 cursor-pointer">
      <CardHeader>
        <CardTitle>Hyzern</CardTitle>
        <CardDescription className="text-xs">
          3 Features | 1 Environments
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end">
        <Avatar className="h-8 w-8">
          <AvatarImage className="w-8" src="/avatars/01.png" alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </CardContent>
    </CardComponent>
  );
}
