import Link from "next/link";
import { Button } from "@/components/ui//button";

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
              <Link href="/login">
                <Button>Get Started</Button>
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
