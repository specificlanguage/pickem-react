import LoginCard from "@/components/auth/login-card.tsx";
import AuthLayout from "@/layouts/auth-layout.tsx";
import { Helmet } from "react-helmet-async";

export const component = function Login() {
  return (
    <AuthLayout>
      <Helmet>
        <title>Login | Pick'em</title>
      </Helmet>
      <div className="justify-center max-w-sm mx-auto my-6">
        <LoginCard />
      </div>
    </AuthLayout>
  );
};
