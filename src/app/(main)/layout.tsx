import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import MenuBar from "./MenuBar";

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
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <MenuBar className="sticky top-[100px] hidden h-fit flex-none space-y-3 rounded-2xl bg-neutral-200 px-2.5 py-2.5 shadow-sm dark:bg-neutral-900 sm:block lg:px-2.5 xl:w-60" />{" "}
          {children}
        </div>
        <MenuBar className="sticky bottom-0 flex w-full justify-around gap-5 border-t bg-neutral-200 p-3 dark:bg-neutral-900 sm:hidden" />{" "}
      </div>
    </SessionProvider>
  );
}
