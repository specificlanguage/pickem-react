import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { RegisterForm } from "@/components/auth/form/register-form.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Link } from "@tanstack/react-router";
import { OAuthButtons } from "@/components/auth/oauth-buttons.tsx";

export default function RegisterCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Sign up to start picking winners of baseball games!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
        <div className="my-2 flex justify-between items-center gap-x-4">
          <Separator className="w-5/12" />
          <span>or</span>
          <Separator className="w-5/12" />
        </div>
        <OAuthButtons />
        <Separator className="my-4" />
        <p className="text-sm">
          Already signed up?{" "}
          <Link
            className="transition-all ease-in-out duration-100 text-blue-500 hover:text-neutral-500"
            to={"/login"}
          >
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
