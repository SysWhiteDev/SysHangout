import { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpCircle } from "react-icons/fi";
import SignUpForm from "./SignUpForm";
import { getTotalUserCount } from "../actions";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <div className="grid h-dvh grid-cols-1 xl:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r-2 border-neutral-400 bg-neutral-800 p-8 text-white dark:border-neutral-800 xl:block">
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full overflow-hidden blur-[250px]">
          <div className="h-[300px] w-[200px] bg-primary" />
          <div className="absolute -right-[50px] bottom-0 h-full w-[200px] bg-primary" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-6xl">{getTotalUserCount()}</span>
          <span className="opacity-80">Users are awaiting you!</span>
        </div>
        <div className="absolute bottom-[2rem]">
          <span className="mt-4 flex items-center gap-2 text-xl font-semibold">
            <FiArrowUpCircle size={25} />
            SysWhite&apos;s Hangout
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-slate-100 shadow dark:bg-card">
        <div className="px-2 text-center md:min-w-[400px]">
          <p className="text-2xl font-semibold">Welcome to SysHangout</p>
          <p className="pt-1 text-sm opacity-75">
            It&apos;s nice to see you here!
          </p>
          <div className="mt-8 flex flex-col gap-1">
            <SignUpForm />
            <span className="mt-4 text-sm text-neutral-800 dark:text-neutral-400">
              Already have an account?{" "}
              <Link href={"/login"} className="hover:underline">
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
