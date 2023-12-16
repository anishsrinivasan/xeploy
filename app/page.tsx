import LandingNavbar from "@/components/shared/landing-navbar";
import { Button } from "@/components/ui//button";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";

export default async function Index() {
  return (
    <div className="flex-1 w-full bg-landing">
      <LandingNavbar  showGetStartedButton/> 
      <div className="flex-1 h-[80vh] w-full flex justify-center flex-col items-center">
        <div className="flex flex-col w-full justify-center items-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center max-w-2xl leading-none mb-4">
            Launch your feautres safely with on-demand rollback.
          </h1>
          <p className="max-w-lg text-lg font-medium text-center mb-8 text-muted-foreground">
            Xeploy is a versatile feature-flagging app that simplifies the
            process of deploying features.
          </p>
          <div className="flex items-center">
            <Link href="/login">
              <Button className="md:h-[50px] md:w-[180px] md:text-lg font-bold mr-4">
              Get Started
              </Button>
            </Link>
            <a target="_blank" href="https://github.com/anishsrinivasan/xeploy">
              <Button
                variant="outline"
                className="md:h-[50px] md:w-[180px] md:text-lg font-bold"
              >
                 <Icons.gitHub className="mr-2 h-4 w-4" /> Github
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
