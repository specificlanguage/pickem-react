import { useState } from "react";
import * as z from "zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FaArrowLeft } from "react-icons/fa6";
import { LuLoader2 } from "react-icons/lu";
import { useSignUp } from "@clerk/clerk-react";
import { PendingVerification } from "@/components/auth/form/pending-verification.tsx";

export function RegisterForm() {
  const [isLoading, setLoading] = useState(false);
  const [queryError, setQueryError] = useState<null | string>(null);
  const [pendingVerification, setPendingVerification] = useState(false);
  const { signUp } = useSignUp();

  const formSchema = z
    .object({
      username: z
        .string()
        .min(4, { message: "Username must be at least 4 characters long" })
        .max(16, { message: "Username must be at most 16 characters long" }),
      email: z.string().email({ message: "Email is required" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character",
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirm"],
    });

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    await signUp
      ?.create({
        emailAddress: values.email,
        username: values.username,
        password: values.password,
      })
      .then(() => {
        signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
        setPendingVerification(true);
      })
      .catch((err) => {
        setLoading(false);
        setQueryError(
          "Couldn't create account, try a different email address or username.",
        );
        console.error(JSON.stringify(err, null, 2));
      });
  }

  if (pendingVerification) {
    return <PendingVerification {...form.getValues()} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@domain.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shohei_ohtani" {...field} />
              </FormControl>
              <FormDescription>This is what people will see.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="*********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {queryError && <FormMessage>{queryError}</FormMessage>}

        <div className="flex justify-between">
          <Button
            type="button"
            className="bg-neutral-500 hover:bg-neutral-600"
            onClick={() => navigate({ to: "/" })}
          >
            <FaArrowLeft className="mr-2" /> Back
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Register"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
