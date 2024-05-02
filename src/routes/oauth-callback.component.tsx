import AuthLayout from "@/layouts/auth-layout.tsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export const component = function OAuthCallback() {
  return (
    <AuthLayout>
      <div className="justify-center max-w-sm mx-auto my-6">
        <AuthenticateWithRedirectCallback />
      </div>
    </AuthLayout>
  );
};
