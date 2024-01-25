import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button.tsx";

interface UserInputs {
  email: string;
  password: string;
  username: string;
}

export function PendingVerification(props: UserInputs) {
  const { signUp, setActive } = useSignUp();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const formSchema = z.object({
    code: z.string().min(1, { message: "Code is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signUp
      ?.attemptEmailAddressVerification({ code: values.code })
      .then((result) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          navigate({ to: "/user/onboarding" });
        } else {
          console.log(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        data-testid="verification-form"
      >
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tigh">
          Verify Email
        </h3>
        <p className="text-sm">
          We've just sent a code to {props.email}. Input the verification code
          below.
        </p>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input placeholder="XXX-XXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Verify"
          )}
        </Button>
      </form>
    </Form>
  );
}
