import { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpCircle } from "react-icons/fi";
import SignInForm from "./SignInForm";
import { getTotalUserCount } from "../actions";

export const metadata: Metadata = {
  title: "Log in",
};

export default function Page() {
  return (
    <div className="grid h-dvh grid-cols-1 xl:grid-cols-2">
      <div className="relative hidden xl:block overflow-hidden border-r-2 border-neutral-400 bg-neutral-800 p-8 text-white dark:border-neutral-800">
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full overflow-hidden blur-[250px]">
          <div className="h-[300px] w-[200px] bg-primary" />
          <div className="absolute -right-[50px] bottom-0 h-full w-[200px] bg-primary" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-6xl">{getTotalUserCount()}</span>
          <span className="opacity-80">Currently registered users</span>
        </div>
        <div className="absolute bottom-[2rem]">
          <span className="mt-4 flex items-center gap-2 text-xl font-semibold">
            <FiArrowUpCircle size={25} />
            SysWhite&apos;s Hangout
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-slate-100 shadow dark:bg-card">
        <div className="md:min-w-[400px] text-center px-2">
          <p className="text-2xl font-semibold">Welcome back to SysHangout</p>
          <p className="pt-1 text-sm opacity-75">
            What do you think youll find today?
          </p>
          <div className="mt-8 flex flex-col gap-1">
            <SignInForm />
            <span className="mt-4 text-sm text-neutral-800 dark:text-neutral-400">
              Don&apos;t have an account?{" "}
              <Link href={"/signup"} className="hover:underline">
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
