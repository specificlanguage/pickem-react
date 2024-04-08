import RegisterCard from "@/components/auth/register-card.tsx";
import AuthLayout from "@/layouts/auth-layout.tsx";
import { Helmet } from "react-helmet-async";

export const component = function Login() {
  return (
    <AuthLayout>
      <Helmet>
        <title>Signup | Pick'ems</title>
      </Helmet>
      <div className="justify-center max-w-sm mx-auto my-6">
        <RegisterCard />
      </div>
    </AuthLayout>
  );
};
