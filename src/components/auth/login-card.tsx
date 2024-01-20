import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { LoginForm } from "@/components/auth/form/login-form.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export default function LoginCard() {
  return (
    <Card className="bg-neutral-200">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>
          Log into Pick'ems to start picking winners of baseball games!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <Separator className="my-4" />
        {/*TODO: Log into google*/}
      </CardContent>
    </Card>
  );
}
