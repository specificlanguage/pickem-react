import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FaArrowLeft } from "react-icons/fa6";
import { LuLoader2 } from "react-icons/lu";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { getUser } from "@/lib/http/users.ts";

export function LoginForm() {
  const [isLoading, setLoading] = useState(false);
  const { signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const formSchema = z.object({
    username: z.string(),
    password: z.string().min(1, { message: "Password is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    await signIn
      ?.create({
        identifier: values.username,
        password: values.password,
      })
      .then(async (result) => {
        if (result.status === "complete") {
          const userInfo = await getUser(values.username);
          await setActive({ session: result.createdSessionId });
          if (userInfo == null) {
            navigate({ to: "/user/onboarding" });
          } else {
            navigate({ to: "/" });
          }
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
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
              "Log In"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
