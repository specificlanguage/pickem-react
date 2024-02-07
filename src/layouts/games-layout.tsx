import MainNav from "@/components/navbar/menus/MainNav.tsx";
import UserNav from "@/components/navbar/menus/UserNav.tsx";
import Footer from "@/components/navbar/menus/Footer.tsx";

interface GamesLayoutProps {
  children: React.ReactNode;
}

export default function GamesLayout({ children }: GamesLayoutProps) {
  return (
    <>
      <header className="w-full bg-neutral-300 text-black">
        <div className="ml-auto flex justify-between max-w-6xl mx-auto p-2 gap-2">
          <MainNav />
          <UserNav />
        </div>
      </header>
      <main className="flex-grow dark:bg-black py-4">{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
