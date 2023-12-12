import { UserNav } from "./user-nav";

export default function MainNavbar() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-8">
        <h2 className="text-md font-bold tracking-tight">FlagSafe</h2>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}