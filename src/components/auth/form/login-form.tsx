import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@/components/firebase.ts";
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

export function LoginForm() {
  const [isLoading, setLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  });

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    signInWithEmailAndPassword(FIREBASE_AUTH, values.email, values.password)
      .then(async (userCredential) => {
        console.log(userCredential.user.uid);
        await navigate({ to: "/" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // TODO send message to user
        setLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
