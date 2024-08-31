import { validateRequest } from "@/auth";
import { hasPermission, PERMISSIONS } from "@/lib/permissions";
import navbarIcon from "@/assets/navbar-icon.png";
import Image from "next/image";

export default async function NotVerified() {
  const { user } = await validateRequest();
  if (user && (await hasPermission(user, PERMISSIONS.VERIFIED))) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-300 dark:bg-neutral-900">
      <div className="max-w-[80%] md:max-w-[60%] lg:max-w-[40%]">
        <Image
          src={navbarIcon}
          alt="Icon"
          className="mb-4"
          width={135}
          height={65}
        />

        <h1 className="mb-1.5 text-4xl font-bold">
          You aren&apos;t verified yet!
        </h1>
        <p className="text-lg opacity-75 dark:opacity-50">
          For security reasons we require that new accounts get verified
          manually by admins, this can take up to 3-4 hours (don&apos;t worry
          they have been notified).
        </p>
      </div>
    </div>
  );
}
