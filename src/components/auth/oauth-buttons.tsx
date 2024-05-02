import { Button } from "@/components/ui/button.tsx";
import { FaDiscord, FaGoogle } from "react-icons/fa6";
import { useSignIn } from "@clerk/clerk-react";
import type { OAuthStrategy } from "@clerk/types";

export function OAuthButtons() {
  const { signIn } = useSignIn();

  const signInWith = async (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: `/oauth-callback`,
      redirectUrlComplete: "/user/onboarding",
    });
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm">Sign in with...</h4>
      <div className="flex flex-row justify-between w-full gap-x-2">
        <Button
          onClick={() => signInWith("oauth_discord")}
          className="flex justify-between gap-2 bg-[#5865F2] w-full hover:bg-[#3a49f2]"
        >
          <FaDiscord />
          <span>Discord</span>
        </Button>
        <Button
          onClick={() => signInWith("oauth_google")}
          className="flex justify-between gap-2 bg-[#4285F4] w-full hover:bg-[#2977f4]"
        >
          <FaGoogle />
          <span>Google</span>
        </Button>
      </div>
    </div>
  );
}
