import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "@/app/(main)/SessionProvider";
import Navbar from "@/app/(main)/Navbar";
import { hasPermission, PERMISSIONS } from "@/lib/permissions";
import AdminSidebar from "./AdminSidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  if (!session.user) redirect("/login");
  if ((await hasPermission(session.user, PERMISSIONS.ADMIN)) === false)
    redirect("/");
  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen w-full flex-col bg-card">
        <Navbar />
        <div className="w-full bg-red-500 text-center font-mono font-bold">
          ADMIN PANEL
        </div>
        <div className="mx-auto hidden w-full max-w-7xl grow gap-5 p-5 md:flex">
          <AdminSidebar>{children}</AdminSidebar>
        </div>
        <div className="mx-auto flex h-screen w-full max-w-7xl grow items-center justify-center gap-5 p-5 md:hidden">
          Please view the page on a larger screen
        </div>
      </div>
    </SessionProvider>
  );
}
