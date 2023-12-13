import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useFeature } from "../context/feature";
import { useToast } from "@/components/ui/use-toast";
import { deleteFeature } from "@/lib/actions/features";

export function DeleteFeature() {
  const { toast } = useToast();
  const { isDeleteFeatureOpen, feature, closeDeleteFeature } = useFeature();

  const handleOpen = (isOpen: boolean) => {
    if (!isOpen) {
      closeDeleteFeature();
    }
  };

  const onDeleteFeature = async () => {
    const formData = new FormData();
    formData.append("projectId", feature?.projectId || "");
    formData.append("featureId", feature?.featureId || "");
    const { error, message } = await deleteFeature(formData);

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message ?? "Please try again after sometime!",
      });
      return;
    }

    toast({
      title: `Feature Deleted!`,
      description: `${feature?.name || "Feature"} is deleted.`,
    });

    closeDeleteFeature();
  };

  return (
    <AlertDialog open={isDeleteFeatureOpen} onOpenChange={handleOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove the
            feature from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={() => onDeleteFeature()} variant="destructive">
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
