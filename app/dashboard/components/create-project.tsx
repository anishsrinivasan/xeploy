"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createProject } from "@/lib/actions/projects";
import { useState } from "react";

export function CreateProject() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    const { error, message } = await createProject(formData);

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
      description: `${name} is Created successfully`,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Project</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <form action={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>You're few steps away!</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-8 pb-16">
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
