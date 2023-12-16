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
import { editFeature } from "@/lib/actions/features";

import { Textarea } from "@/components/ui/textarea";
import { useFeature } from "../context/feature";

type Props = {};

export function EditFeature(_: Props) {
  const { toast } = useToast();
  const { isEditFeatureOpen, feature, closeEditFeature } = useFeature();

  const handleOpen = (isOpen: boolean) => {
    if (!isOpen) {
      closeEditFeature();
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    const { error, message } = await editFeature(formData);

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

    closeEditFeature();
  };

  return (
    <Dialog open={isEditFeatureOpen} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <form action={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Feature</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-8">
            <Input
              id="projectId"
              name="projectId"
              className="hidden"
              defaultValue={feature?.projectId}
              required
              hidden
            />
            <Input
              id="featureId"
              name="featureId"
              className="hidden"
              defaultValue={feature?.featureId}
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
                defaultValue={feature?.name}
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
                defaultValue={feature?.description || undefined}
                placeholder=""
                className="col-span-3"
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
