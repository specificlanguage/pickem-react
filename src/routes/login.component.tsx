import LoginCard from "@/components/auth/login-card.tsx";
import AuthLayout from "@/layouts/auth-layout.tsx";

export const component = function Login() {
  return (
    <AuthLayout>
      <div className="justify-center max-w-sm mx-auto my-6">
        <LoginCard />
      </div>
    </AuthLayout>
  );
};
