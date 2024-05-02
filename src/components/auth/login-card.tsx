import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { LoginForm } from "@/components/auth/form/login-form.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Link } from "@tanstack/react-router";
import { OAuthButtons } from "@/components/auth/oauth-buttons.tsx";

export default function LoginCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>
          Log into Pick'ems to start picking winners of baseball games!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <div className="my-2 flex justify-between items-center gap-x-4">
          <Separator className="w-5/12" />
          <span>or</span>
          <Separator className="w-5/12" />
        </div>
        <OAuthButtons />
        <Separator className="my-4" />
        <p className="text-sm">
          Don't have an account?{" "}
          <Link
            className="transition-all ease-in-out duration-100 text-blue-500 hover:text-neutral-500"
            to={"/signup"}
          >
            Sign up
          </Link>
        </p>
        {/*TODO: Log into google*/}
      </CardContent>
    </Card>
  );
}
