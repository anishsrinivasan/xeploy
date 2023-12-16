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
import { Button } from "@/components/ui/button";

type Props = {
  environments: Environments[];
};

export default function CodeBlockCurl(props: Props) {
  const { copyToClipboard } = useCopyToast();
  const defaultValue = props?.environments
    ? props?.environments?.length > 0
      ? props?.environments[0].envId
      : undefined
    : undefined;

  const [currentEnv, setEnv] = useState<string | undefined>(defaultValue);
  const [showToken, setShowToken] = useState(false);
  const [responseJson, setResponseJson] = useState<string | null>();
  const [responseTime, setResponseTime] = useState<string | null>();

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

  const runFetch = async () => {
    try {
      const startTime = performance.now();
      const res = await fetch(FEATURE_API_ENDPOINT, {
        headers: { Authorization: `Bearer ${apiToken}` },
      });
      const responseTime = (performance.now() - startTime).toFixed(0);
      const response = await res.json();

      setResponseJson(response);
      setResponseTime(responseTime);
      console.log("Response Time", responseTime);
    } catch (err) {
      console.error("runFetchErr", err);
    }
  };

  const clearResponse = () => {
    setResponseJson(null);
    setResponseTime(null);
  };

  if (!defaultValue) {
    return (
      <p className="text-12">Oops, Please create an Environment to proceed!</p>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Select
          value={currentEnv}
          onValueChange={(envId) => {
            setEnv(envId);
            clearResponse();
          }}
        >
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

      <div className="mt-8 mb-8">
        <div className="mb-2">
          <Button className="mr-2" onClick={runFetch} variant="outline">
            Run
          </Button>

          <Button onClick={clearResponse} variant="outline">
            Clear
          </Button>
        </div>
        <div className="h-[10px]">
          {responseTime ? (
            <p className="text-gray-600 text-xs">
              Time Taken : {responseTime}ms
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="border min-h-[200px] rounded-lg p-10">
        {responseJson ? (
          <pre>
            <code>{JSON.stringify(responseJson, null, 2)}</code>
          </pre>
        ) : (
          <p>Tap on the run to test the cURL</p>
        )}
      </div>
    </div>
  );
}
