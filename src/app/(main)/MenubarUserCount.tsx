import { formatNumber } from "@/lib/utils";
import { getTotalUserCount } from "../(auth)/actions";

export default async function MenubarUserCount() {
  return (
    <div className="hidden min-h-32 flex-none flex-col items-start justify-end rounded-xl border-2 border-neutral-200 bg-gradient-to-br from-card to-primary p-4 shadow-sm dark:border-neutral-800 lg:flex xl:w-60">
      <span className="text-3xl font-semibold">
        {formatNumber(await getTotalUserCount())}
      </span>
      <span className="text-sm opacity-60">total users</span>
    </div>
  );
}
