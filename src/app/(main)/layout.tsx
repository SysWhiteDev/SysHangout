import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import MenuBar from "./MenuBar";
import TrendingSidebar from "@/components/TrendingSidebar";
import MenubarUserCount from "./MenubarUserCount";
import NotVerified from "./NotVerified";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  if (!session.user) redirect("/login");
  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen w-full flex-col bg-card">
        <Navbar />
        <NotVerified />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <div className="sticky top-[98px] hidden h-fit space-y-5 md:block">
            <MenuBar className="flex-none space-y-1.5 rounded-xl bg-neutral-200 p-2.5 shadow-sm dark:bg-neutral-900 lg:px-2.5 xl:w-60" />{" "}
            <MenubarUserCount />
          </div>
          {children}
          <TrendingSidebar />
        </div>
        <MenuBar className="sticky bottom-0 flex w-full justify-around gap-5 border-t bg-neutral-200 p-3 dark:bg-neutral-900 md:hidden" />
      </div>
    </SessionProvider>
  );
}
