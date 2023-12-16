import LandingNavbar from "@/components/shared/landing-navbar";
import SignInWithGoogle from "./components/signin-with-google";

export default function AuthenticationPage() {
  return (
    <>
      <LandingNavbar />
      <div className="flex min-h-screen justify-center items-center overflow-hidden">
        <div className="my-auto mx-auto px-8 max-w-[600px]">
          <h1 className="text-3xl font-semibold tracking-tight">Hola!</h1>
          <p className="text-md text-muted-foreground mb-8">Login to Xeploy!</p>
          <div className="mb-8">
            <SignInWithGoogle />
          </div>
          <p className="text-left text-xs text-muted-foreground">
            By clicking continue, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
    </>
  );
}
