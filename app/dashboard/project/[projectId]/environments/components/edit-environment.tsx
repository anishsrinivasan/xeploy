"use client";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/components/ui/use-toast";
import { editEnvironment } from "@/lib/actions/environments";

import { useEnvironment } from "../context/environment";

type Props = {};

export function EditEnvironment(_: Props) {
  const { toast } = useToast();
  const { isEditEnvironmentOpen, environment, closeEditEnvironment } =
    useEnvironment();

  const handleOpen = (isOpen: boolean) => {
    if (!isOpen) {
      closeEditEnvironment();
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    const { error, message } = await editEnvironment(formData);

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
      description: `${name} is updated successfully`,
    });

    closeEditEnvironment();
  };

  return (
    <Dialog open={isEditEnvironmentOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Environment</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <form action={handleFormSubmit}>
          <div className="grid gap-4 py-8">
            <Input
              id="projectId"
              name="projectId"
              className="hidden"
              defaultValue={environment?.projectId}
              required
              hidden
            />
            <Input
              id="envId"
              name="envId"
              className="hidden"
              defaultValue={environment?.envId}
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
                defaultValue={environment?.name}
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
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
