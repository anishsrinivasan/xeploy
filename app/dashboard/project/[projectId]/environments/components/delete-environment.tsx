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
import { useEnvironment } from "../context/environment";
import { useToast } from "@/components/ui/use-toast";
import { deleteEnvironment } from "@/lib/actions/environments";

export function DeleteEnvironment() {
  const { toast } = useToast();
  const { isDeleteEnvironmentOpen, environment, closeDeleteEnvironment } = useEnvironment();

  const handleOpen = (isOpen: boolean) => {
    if (!isOpen) {
      closeDeleteEnvironment();
    }
  };

  const onDeleteEnvironment = async () => {
    const formData = new FormData();
    formData.append("projectId", environment?.projectId || "");
    formData.append("envId", environment?.envId || "");
    const { error, message } = await deleteEnvironment(formData);

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message ?? "Please try again after sometime!",
      });
      return;
    }

    toast({
      title: `Environment Deleted!`,
      description: `${environment?.name || "Environment"} is deleted.`,
    });

    closeDeleteEnvironment();
  };

  return (
    <AlertDialog open={isDeleteEnvironmentOpen} onOpenChange={handleOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove the
            environment from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={() => onDeleteEnvironment()} variant="destructive">
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
