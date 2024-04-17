import MainNav from "@/components/navbar/menus/MainNav.tsx";
import UserNav from "@/components/navbar/menus/UserNav.tsx";
import Footer from "@/components/navbar/menus/Footer.tsx";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <header className="w-full bg-neutral-300 text-black">
        <div className="ml-auto flex justify-between max-w-6xl mx-auto p-2 gap-2 h-16">
          <MainNav />
          <UserNav />
        </div>
      </header>
      <main className="flex-grow bg-gradient-to-br from-[#026d37] to-[#142b1c]">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
