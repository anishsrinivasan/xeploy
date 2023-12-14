import { useToast, Toast } from "@/components/ui/use-toast";
import { copyTextToClipboard as copyTextToClipboardPrimitive  } from "@/lib/helpers/copyToClipboard";

export function useCopyToast() {
  const { toast } = useToast();

  const copyToClipboard = async (copyText: string, toastProps: Toast) => {
    try {
      await copyTextToClipboardPrimitive(copyText|| "");
      toast(toastProps);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please try again after sometime!",
      });
    }
  };

  return { copyToClipboard };
}
