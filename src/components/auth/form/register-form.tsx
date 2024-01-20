import { useState } from "react";
import * as z from "zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH } from "@/components/firebase.ts";
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

export function RegisterForm() {
  const [isLoading, setLoading] = useState(false);
  const [queryError, setQueryError] = useState<null | string>(null);

  const formSchema = z
    .object({
      username: z
        .string()
        .min(4, { message: "Username must be at least 4 characters long" })
        .max(16, { message: "Username must be at most 16 characters long" }),
      email: z.string().email({ message: "Email is required" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character",
        ),
      confirmPassword: z.string().min(6),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    createUserWithEmailAndPassword(FIREBASE_AUTH, values.email, values.password)
      .then(async (userCredential) => {
        // TODO: prevent duplicate usernames
        await updateProfile(userCredential.user, {
          displayName: values.username,
        });
        navigate({ to: "/user/onboarding" });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setQueryError(
          "Could not create account. Try again or with a different email or username!",
        );
      });
  }

  // form.getFieldState("username");

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
