"use client";
import { CopyIcon, EyeIcon, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Environments } from "@/types/entity";
import { FEATURE_API_ENDPOINT } from "@/constants";
import { useState } from "react";
import { useCopyToast } from "@/components/ui/use-copy-toast";
import { createcURL } from "@/lib/helpers/http";

type Props = {
  environments: Environments[];
};

export default function CodeBlockCurl(props: Props) {
  const { copyToClipboard } = useCopyToast();
  const defaultValue = props?.environments
    ? props?.environments?.length > 1
      ? props?.environments[0].envId
      : undefined
    : undefined;

  const [currentEnv, setEnv] = useState<string | undefined>(defaultValue);
  const [showToken, setShowToken] = useState(false);

  const apiToken = props.environments.find(
    (x) => x.envId === currentEnv
  )?.apiToken;

  const copyCurl = async () => {
    copyToClipboard(createcURL(apiToken || ""), {
      title: `Copied to Clipboard`,
      description: `cURL is copied to the Clipboard.`,
    });
  };

  const toggleShow = () => setShowToken((showToken) => !showToken);

  if (!defaultValue) {
    return (
      <p className="text-12">Oops, Please create an Environment to proceed!</p>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Select value={currentEnv} onValueChange={(envId) => setEnv(envId)}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Choose an Environment" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {props.environments.map((env) => (
                <SelectItem key={env.envId} value={env.envId}>
                  {env.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="relative bg-muted py-8 px-6 rounded-lg">
        <div className="absolute top-0 right-0 py-4 px-4">
          <div className="flex justify-center items-center">
            <div onClick={toggleShow} className="cursor-pointer mr-2">
              {!showToken ? <EyeIcon /> : <EyeOff />}
            </div>
            <div onClick={copyCurl} className="cursor-pointer">
              <CopyIcon />
            </div>
          </div>
        </div>
        <pre className="mt-4 w-full overflow-x-auto ">
          curl "{FEATURE_API_ENDPOINT}" \
          <br />
          -H "Authorization: Bearer {showToken ? apiToken : "*******"}"
        </pre>
      </div>
    </div>
  );
}
