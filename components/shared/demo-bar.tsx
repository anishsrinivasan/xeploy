import { Suspense } from "react";
import { AlertTriangleIcon } from "lucide-react";
import { getUserData } from "@/lib/actions/auth";
import { DEMO_USER_EMAIL } from "@/constants";

export default async function Demobar() {
  const data = await getUserData();
  const showDemoBar = data && data?.email === DEMO_USER_EMAIL;

  return (
    <Suspense fallback={<></>}>
      {showDemoBar ? (
        <header className="z-50 sticky top-20 w-full border-b bg-yellow-600	text-black">
          <div className="flex-col md:flex">
            <div className="border-b">
              <div className="flex h-[40px] items-center px-8 md:px-16">
                <p className="flex items-center text-10 text-center font-semibold">
                  <AlertTriangleIcon className="mr-2 h-5 w-5" /> Warning : You
                  are using a Demo Version
                </p>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <></>
      )}
    </Suspense>
  );
}
