import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import { FiArrowUpCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <div className="grid h-dvh grid-cols-2">
      <div className="relative overflow-hidden border-r-2 text-white border-neutral-400 bg-neutral-800 p-8">
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full overflow-hidden blur-[250px]">
          <div className="h-[300px] w-[200px] bg-violet-400" />
          <div className="absolute -right-[50px] bottom-0 h-full w-[200px] bg-blue-500" />
        </div>
        <span className="flex absolute bottom-[2rem] items-center gap-1.5 text-xl font-semibold">
          <FiArrowUpCircle size={25} />
          SysWhite&apos;s Hangout
        </span>
      </div>
      <div className="flex bg-slate-100 flex-col items-center justify-center shadow">
        <div className="min-w-[400px] text-center">
          <p className="text-2xl font-semibold">Welcome to SysHangout</p>
          <p className="pt-1 text-sm opacity-75">
            Enter your email below to create your account
          </p>
          <div className="mt-8 flex flex-col gap-1">
            <Input placeholder="E-mail" type="email" />
            <Input placeholder="Password" type="password" />
            <Button className="mt-2.5">Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
