import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import OnboardingForm from "@/components/forms/settings/onboarding-form.tsx";
// import { useAuth } from "@clerk/clerk-react";
// import { useNavigate } from "@tanstack/react-router";
import AuthLayout from "@/layouts/auth-layout.tsx";
import { usePrefs } from "@/lib/http/users.ts";
import { useAuth } from "@clerk/clerk-react";
import LoadingSpinner from "@/components/loading-wheel.tsx";
import { useNavigate } from "@tanstack/react-router";

export const component = function Onboard() {
  const { getToken, userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  const { isLoading, prefs } = usePrefs(
    getToken() ?? "",
    userId ?? "",
    isLoaded,
  );

  if (!isLoaded && isLoading) {
    return (
      <AuthLayout>
        <LoadingSpinner size={48} />
      </AuthLayout>
    );
  }

  if (prefs !== null) {
    navigate({ to: "/" });
  }

  return (
    <AuthLayout>
      <div className="justify-center max-w-lg mx-auto my-6">
        <Card>
          <CardHeader>
            <CardTitle>Before we start...</CardTitle>
            <CardDescription>
              We'd like to know a few more details so we can better personalize
              the picking experience for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OnboardingForm />
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};
