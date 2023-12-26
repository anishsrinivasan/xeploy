import Link from "next/link";
import { Button } from "@/components/ui//button";
import { Gauge, Timer } from "lucide-react";
import { Icons } from "@/components/ui/icons";

type Props = {
  showGetStartedButton?: boolean;
};
export default function LandingNavbar(
  props: Props = { showGetStartedButton: false }
) {
  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="flex-col md:flex">
        <div className="flex h-20 items-center px-8 md:px-16">
          <Link href="/">
            <h2 className="text-2xl font-bold tracking-tight">Xeploy</h2>
          </Link>

          {props?.showGetStartedButton ? (
            <div className="ml-auto flex items-center space-x-4">
              <a
                target="_blank"
                href="https://github.com/anishsrinivasan/xeploy"
              >
                <Icons.gitHub className="mr-2 h-6 w-6" />
              </a>
              <Link
                className="hidden md:block"
                href="/auth/demo"
                prefetch={false}
              >
                <Button variant="outline">
                  <Timer className="mr-2 h-4 w-4" /> Try Live Demo
                </Button>
              </Link>
              <Link href="/login" prefetch={false}>
                <Button>
                  <Gauge className="mr-2 h-4 w-4" /> Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
}
