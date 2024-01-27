import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import OnboardingForm from "@/components/forms/onboarding/onboarding-form.tsx";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";

export const component = function Onboard() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isSignedIn === false) {
    navigate({ to: "/login" });
  }

  return (
    <div className="mx-auto max-w-lg my-5 lg:my-10">
      <Card>
        <CardHeader>
          <CardTitle>Before we start...</CardTitle>
          <CardDescription>
            We'd lke to know a few more details so we can better personalize the
            picking experience for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingForm />
        </CardContent>
      </Card>
    </div>
  );
};
