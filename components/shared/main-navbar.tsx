import Link from "next/link";
import { UserNav } from "./user-nav";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MainNavbar() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-8">
          <Link href="/dashboard">
            <h2 className="text-md font-bold tracking-tight">Xeploy</h2>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
              <UserNav />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
