"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { createFeature } from "@/lib/actions/features";
import { Environments } from "@/types/entity";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  environments: Environments[];
  projectId: string;
};

export function CreateFeature(props: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    const { error, message } = await createFeature(formData);

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message ?? "Please try again after sometime!",
      });
      return;
    }

    const name = formData.get("name");

    toast({
      title: `Happy Building!`,
      description: `${name} is created successfully`,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Feature</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <form action={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle>Create Feature</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-8">
            <Input
              id="projectId"
              name="projectId"
              className="hidden"
              value={props.projectId}
              required
              hidden
            />
            <div className="grid w-full items-center gap-2 mb-4">
              <Label className="mb-1" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder=""
                className="col-span-3"
                required
              />
            </div>
            <div className="grid w-full items-center gap-2 mb-4">
              <Label className="mb-1" htmlFor="name">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder=""
                className="col-span-3"
              />
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 py-8 pb-16">
            <p className="text-lg font-medium">Environments Active Status</p>
            {props.environments.map((env) => (
              <div key={env.envId} className="flex items-center space-x-2">
                <Checkbox
                  defaultChecked
                  value={env.envId}
                  name={"envEnabled"}
                  id={env.envId}
                />
                <label
                  htmlFor={env.envId}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {env.name}
                </label>
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
